import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getSeatPrice,
  isPrioritySeat,
  calculateTotalAmount,
  generateBookingReference,
  constructWhatsAppBookingMessage,
  generateWhatsAppUrl,
  WHATSAPP_CONTACT_NUMBER,
  STOPS
} from './bookingLogic';

test('getSeatPrice returns ₹400 for Sleeper and ₹380 for Regular', () => {
  assert.equal(getSeatPrice('Sleeper'), 400);
  assert.equal(getSeatPrice('Regular'), 380);
});

test('isPrioritySeat correctly identifies seats 7 through 13', () => {
  assert.equal(isPrioritySeat(6), false);
  assert.equal(isPrioritySeat(7), true);
  assert.equal(isPrioritySeat(10), true);
  assert.equal(isPrioritySeat(13), true);
  assert.equal(isPrioritySeat(14), false);
  assert.equal(isPrioritySeat('8'), true);
  assert.equal(isPrioritySeat('25'), false);
});

test('calculateTotalAmount sums regular and sleeper seats correctly', () => {
  const seats = [
    { seat_category: 'Regular' },
    { seat_category: 'Regular' },
    { seat_category: 'Sleeper' }
  ];
  // 380 + 380 + 400 = 1160
  assert.equal(calculateTotalAmount(seats), 1160);
});

test('generateBookingReference produces GT followed by date and 4 digits', () => {
  const testDate = new Date(2026, 9, 21);
  const ref = generateBookingReference(testDate);
  assert.match(ref, /^GT261021\d{4}$/);
});

test('constructWhatsAppBookingMessage formats all required fields in Hinglish cleanly', () => {
  const message = constructWhatsAppBookingMessage({
    bookingRef: 'GT2610214892',
    passengerName: 'Ramesh Kumar',
    passengerPhone: '9876543210',
    boardingStop: 'Bettiah',
    seatNumbers: ['9', '10'],
    totalAmount: 760,
    journeyDate: '2026-10-25'
  });

  assert.ok(message.includes('GT2610214892'));
  assert.ok(message.includes('Ramesh Kumar'));
  assert.ok(message.includes('9876543210'));
  assert.ok(message.includes('Bettiah se Patna'));
  assert.ok(message.includes('760'));
});

test('generateWhatsAppUrl creates valid wa.me URL with contact number and encoded text', () => {
  const url = generateWhatsAppUrl('Namaste');
  assert.equal(url, `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=Namaste`);
});

test('STOPS list contains the required Bettiah to Patna intermediate stops', () => {
  assert.ok(STOPS.length >= 5);
  assert.ok(STOPS[0].includes('Bettiah'));
});
