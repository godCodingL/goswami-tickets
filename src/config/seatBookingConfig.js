/**
 * =====================================================================
 * GOSWAMI TICKETS - SEAT BOOKING CONFIGURATION (HINGLISH)
 * =====================================================================
 * Yahan se aap seat numbers, ticket rates, boarding points,
 * priority seats aur WhatsApp message template aasani se edit kar sakte hain!
 * =====================================================================
 */

export const BUS_CONFIG = {
  // Bus Service ki Details
  operatorName: 'Goswami Travels',
  serviceName: 'Bettiah se Patna Daily Express Bus',
  origin: 'Bettiah',
  destination: 'Patna',
  departureTime: '10:00 PM (Raat)',
  arrivalTime: '05:30 AM (Subah)',
  totalSeats: 40,

  // Bus Hero Image Path (User ki di hui luxury bus image)
  busHeroImage: '/assets/aistudio/image_8ebb8a4b.png',

  // WhatsApp Contact (Country code 91 ke saath)
  whatsappNumber: '917763043712',
  phoneDisplay: '+91 77630 43712',
  emergencyPhone: '+91 77630 43712',

  // Ticket Pricing (Indian Rupees INR)
  pricing: {
    regularSeatPrice: 380, // Seats 1 se 30
    sleeperSeatPrice: 400, // Berths 31 se 40
    currencySymbol: '₹',
  },

  // Priority Front Cabin Seats (Extra legroom & smooth ride)
  prioritySeats: [7, 8, 9, 10, 11, 12, 13],

  // Sleeper Berths (Aaramdayak sone ke liye)
  sleeperSeats: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],

  // Raaste ke Boarding Stops
  boardingStops: [
    'Bettiah (Private Bus Stand Counter #4)',
    'Gajdishpur (Main Chowk)',
    'Paharpur (Petrol Pump Stop)',
    'Areraj (Someshwar Nath Mandir Gate)',
    'Khajuria (NH-28 Crossing)',
  ],

  // Patna mein Drop Points
  dropPoints: [
    'Gandhi Maidan Gate #5',
    'Mithapur Old Bus Stand',
    'ISBT Bairiya Patna',
    'Danapur Railway Station',
  ],

  // WhatsApp Message Template in Natural Hinglish
  formatWhatsAppMessage({
    bookingRef,
    passengerName,
    passengerPhone,
    boardingStop,
    seatNumbers,
    totalAmount,
    journeyDate,
    journeyTime = '10:00 PM',
  }) {
    return `Namaste Goswami Travels!
Meri bus ticket booking request:
🎫 Booking ID: ${bookingRef}
👤 Yatri Ka Naam: ${passengerName}
📱 Mobile Number: ${passengerPhone}
📍 Route: Bettiah se Patna
🚏 Boarding Stop: ${boardingStop}
💺 Seat Number(s): ${seatNumbers.join(', ')}
💰 Total Kiraya: ₹${totalAmount}
📅 Safar Ki Tareekh: ${journeyDate} (${journeyTime})

Kripya meri seat confirm kar dijiye. Kiraya main boarding counter par cash/UPI se dunga. Dhanyawad!`;
  },
};
