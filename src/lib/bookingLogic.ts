import { BUS_CONFIG } from '../config/seatBookingConfig.js';
import {
  isPrioritySeat,
  isSleeperSeat,
  getSeatPrice as getPrice,
  calculateTotalFare,
  generateBookingReference as genRef
} from '../services/seatBookingService.js';

export const STOPS = BUS_CONFIG.boardingStops;
export const PATNA_DROPS = BUS_CONFIG.dropPoints;
export const WHATSAPP_CONTACT_NUMBER = BUS_CONFIG.whatsappNumber;
export const HELPLINE_NUMBER = BUS_CONFIG.phoneDisplay;
export const EMERGENCY_NUMBER = BUS_CONFIG.emergencyPhone;

export function getSeatPrice(category: string | number): number {
  if (typeof category === 'number' || !isNaN(Number(category))) {
    return getPrice(category);
  }
  return category === 'Sleeper' ? BUS_CONFIG.pricing.sleeperSeatPrice : BUS_CONFIG.pricing.regularSeatPrice;
}

export { isPrioritySeat };

export function calculateTotalAmount(selectedSeats: { seat_category?: string; seat_number?: string | number }[]): number {
  return selectedSeats.reduce((sum, seat) => {
    if (seat.seat_number) {
      return sum + getPrice(seat.seat_number);
    }
    const isSleeper = seat.seat_category === 'Sleeper';
    return sum + (isSleeper ? BUS_CONFIG.pricing.sleeperSeatPrice : BUS_CONFIG.pricing.regularSeatPrice);
  }, 0);
}

export function generateBookingReference(date: Date = new Date()): string {
  return genRef(date);
}

export function constructWhatsAppBookingMessage(params: {
  bookingRef: string;
  passengerName: string;
  passengerPhone: string;
  boardingStop: string;
  seatNumbers: string[];
  totalAmount: number;
  journeyDate: string;
  journeyTime?: string;
}): string {
  return BUS_CONFIG.formatWhatsAppMessage({
    bookingRef: params.bookingRef,
    passengerName: params.passengerName,
    passengerPhone: params.passengerPhone,
    boardingStop: params.boardingStop,
    seatNumbers: params.seatNumbers,
    totalAmount: params.totalAmount,
    journeyDate: params.journeyDate,
    journeyTime: params.journeyTime || BUS_CONFIG.departureTime,
  });
}

export function generateWhatsAppUrl(message: string, phone: string = BUS_CONFIG.whatsappNumber): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
