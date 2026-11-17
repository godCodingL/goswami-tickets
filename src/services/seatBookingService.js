/**
 * =====================================================================
 * GOSWAMI TICKETS - SEAT BOOKING SERVICE (FRONTEND ONLY)
 * =====================================================================
 * All seat booking logic, seat maps, double-booking prevention,
 * fare calculation, and WhatsApp ticket generation live here.
 * You can easily edit or extend this file!
 * =====================================================================
 */

import { BUS_CONFIG } from '../config/seatBookingConfig.js';
import {
  AVAILABLE_SEATS,
  BOOKED_SEATS,
} from '../config/seat_allocation.js';

const STORAGE_KEYS = {
  SEATS: 'goswami_seats_v2',
  BOOKINGS: 'goswami_bookings_v2',
};

// In-memory fallback when localStorage is unavailable (e.g. Node test runner)
const memoryStore = new Map();

function storageGet(key) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key);
    } catch {
      return memoryStore.get(key) || null;
    }
  }
  return memoryStore.get(key) || null;
}

function storageSet(key, value) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(key, value);
      return;
    } catch {
      memoryStore.set(key, value);
      return;
    }
  }
  memoryStore.set(key, value);
}


/**
 * Check if a seat is a priority seat (e.g. 7-13)
 */
export function isPrioritySeat(seatNumber) {
  const num = typeof seatNumber === 'number' ? seatNumber : parseInt(seatNumber, 10);
  return BUS_CONFIG.prioritySeats.includes(num);
}

/**
 * Check if a seat is a sleeper berth (e.g. 31-40)
 */
export function isSleeperSeat(seatNumber) {
  const num = typeof seatNumber === 'number' ? seatNumber : parseInt(seatNumber, 10);
  return BUS_CONFIG.sleeperSeats.includes(num);
}

/**
 * Get ticket price for a specific seat
 */
export function getSeatPrice(seatNumber) {
  return isSleeperSeat(seatNumber)
    ? BUS_CONFIG.pricing.sleeperSeatPrice
    : BUS_CONFIG.pricing.regularSeatPrice;
}

/**
 * Calculate total fare for an array of seat numbers
 */
export function calculateTotalFare(seatNumbers = []) {
  return seatNumbers.reduce((sum, seatNum) => sum + getSeatPrice(seatNum), 0);
}

/**
 * Generate unique human-readable booking reference (e.g. GT2610214892)
 */
export function generateBookingReference(date = new Date()) {
  const yy = date.getFullYear().toString().slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `GT${yy}${mm}${dd}${rand}`;
}

/**
 * Initialize default 40 seats in browser localStorage if not already present
 */
export function getSeatsList() {
  try {
    const stored = storageGet(STORAGE_KEYS.SEATS);
    if (stored) {
      return JSON.parse(stored);
    }

    // Build default seats from 1 to totalSeats
    const defaultSeats = [];
    for (let i = 1; i <= BUS_CONFIG.totalSeats; i++) {
      defaultSeats.push({
        id: `seat-${i}`,
        seat_number: String(i),
        seat_category: isSleeperSeat(i) ? 'Sleeper' : 'Regular',
        price: getSeatPrice(i),
        active: true,
      });
    }

    storageSet(STORAGE_KEYS.SEATS, JSON.stringify(defaultSeats));
    return defaultSeats;
  } catch (err) {
    console.error('Error loading seats:', err);
    return [];
  }
}

/**
 * Toggle seat availability (block or unblock seat)
 */
export function toggleSeatActiveStatus(seatIdOrNumber) {
  const currentSeats = getSeatsList();
  const updated = currentSeats.map((seat) => {
    if (seat.id === seatIdOrNumber || seat.seat_number === String(seatIdOrNumber)) {
      return { ...seat, active: !seat.active };
    }
    return seat;
  });

  storageSet(STORAGE_KEYS.SEATS, JSON.stringify(updated));
  return updated;
}

/**
 * Retrieve all bookings stored in localStorage
 */
export function getAllBookings() {
  try {
    const stored = storageGet(STORAGE_KEYS.BOOKINGS);
    if (stored) {
      return JSON.parse(stored);
    }

    storageSet(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
    return [];
  } catch (err) {
    console.error('Error loading bookings:', err);
    return [];
  }
}

/**
 * Get all booked seat numbers for a given travel date
 */
export function getBookedSeatNumbersForDate(journeyDate) {
  const bookedSeatNumbers = new Set(
    Array.from({ length: BUS_CONFIG.totalSeats }, (_, index) => String(index + 1))
      .filter((seatNumber) => !AVAILABLE_SEATS.includes(seatNumber))
  );

  BOOKED_SEATS.forEach((seatNumber) => {
    bookedSeatNumbers.add(String(seatNumber));
  });

  return [...bookedSeatNumbers];
}

/**
 * Create a new seat booking (100% frontend logic)
 * Validates availability, creates unique ref ID, calculates total,
 * builds WhatsApp link, and persists to localStorage.
 */
export function createSeatBooking({
  journeyDate,
  passengerName,
  passengerPhone,
  boardingStop,
  seatNumbers, // Array of seat numbers (e.g. ['7', '8'])
  source = 'website',
  paymentStatus = 'pending',
  bookingStatus = 'pending',
}) {
  if (!seatNumbers || seatNumbers.length === 0) {
    throw new Error('Please select at least one seat.');
  }

  // Only manually approved seats count as booked; requests stay pending until updated in seat_allocation.js.
  const alreadyBooked = getBookedSeatNumbersForDate(journeyDate);
  const conflictingSeats = seatNumbers.filter((num) => alreadyBooked.includes(String(num)));

  if (conflictingSeats.length > 0) {
    throw new Error(
      `Seat(s) ${conflictingSeats.join(', ')} are already booked for ${journeyDate}. Please select other seats.`
    );
  }

  const bookingRef = generateBookingReference();
  const totalAmount = calculateTotalFare(seatNumbers);
  const bookingId = `book-${Date.now()}`;

  // Build the WhatsApp pre-filled message
  const whatsappMessage = BUS_CONFIG.formatWhatsAppMessage({
    bookingRef,
    passengerName,
    passengerPhone,
    boardingStop,
    seatNumbers,
    totalAmount,
    journeyDate,
    journeyTime: BUS_CONFIG.departureTime,
  });

  const whatsappUrl = `https://wa.me/${BUS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const newBooking = {
    id: bookingId,
    booking_reference: bookingRef,
    journey_date: journeyDate,
    passenger_name: passengerName,
    passenger_phone: passengerPhone,
    boarding_stop: boardingStop,
    seat_numbers: seatNumbers.map(String),
    source,
    booking_status: bookingStatus,
    payment_status: paymentStatus,
    total_amount: totalAmount,
    whatsapp_url: whatsappUrl,
    created_at: new Date().toISOString(),
  };

  // Save to storage
  const currentBookings = getAllBookings();
  const updatedBookings = [newBooking, ...currentBookings];
  storageSet(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedBookings));

  return {
    success: true,
    booking: newBooking,
    bookingRef,
    totalAmount,
    whatsappUrl,
    message: whatsappMessage,
  };
}

/**
 * Update booking confirmation status (confirmed, pending, cancelled)
 */
export function updateBookingStatus(bookingId, newStatus) {
  const current = getAllBookings();
  const updated = current.map((b) => (b.id === bookingId ? { ...b, booking_status: newStatus } : b));
  storageSet(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  return updated;
}

/**
 * Update booking payment status (paid, pending, refunded)
 */
export function updatePaymentStatus(bookingId, newStatus) {
  const current = getAllBookings();
  const updated = current.map((b) => (b.id === bookingId ? { ...b, payment_status: newStatus } : b));
  storageSet(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  return updated;
}

/**
 * Delete a booking record
 */
export function deleteBooking(bookingId) {
  const current = getAllBookings();
  const updated = current.filter((b) => b.id !== bookingId);
  storageSet(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  return updated;
}
