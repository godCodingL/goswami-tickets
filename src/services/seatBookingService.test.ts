import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isPrioritySeat,
  isSleeperSeat,
  getSeatPrice,
  calculateTotalFare,
  generateBookingReference,
  createSeatBooking,
  getAllBookings,
  getBookedSeatNumbersForDate
} from './seatBookingService.js';
import { BUS_CONFIG } from '../config/seatBookingConfig.js';
import { AVAILABLE_SEATS, BOOKED_SEATS } from '../config/seat_allocation.js';

test('isPrioritySeat matches configured priority seats', () => {
  assert.equal(isPrioritySeat(7), true);
  assert.equal(isPrioritySeat(13), true);
  assert.equal(isPrioritySeat(14), false);
});

test('isSleeperSeat correctly identifies sleeper berths 31-40', () => {
  assert.equal(isSleeperSeat(30), false);
  assert.equal(isSleeperSeat(31), true);
  assert.equal(isSleeperSeat(40), true);
});

test('calculateTotalFare correctly computes mixed regular and sleeper seats', () => {
  // Regular seat (380) + Sleeper berth (400) = 780
  const fare = calculateTotalFare([7, 35]);
  assert.equal(fare, 780);
});

test('createSeatBooking records a request without booking the seat before manual approval', () => {
  const testDate = '2026-11-15';
  const result = createSeatBooking({
    journeyDate: testDate,
    passengerName: 'Test Passenger',
    passengerPhone: '9876543210',
    boardingStop: 'Bettiah',
    seatNumbers: ['7', '8'],
    source: 'website'
  });

  assert.equal(result.success, true);
  assert.ok(result.bookingRef.startsWith('GT'));
  assert.equal(result.totalAmount, 760);
  assert.ok(result.whatsappUrl.includes(BUS_CONFIG.whatsappNumber));
  assert.equal(getBookedSeatNumbersForDate(testDate).includes('7'), false);
});

test('only seats 7-13 are available by default', () => {
  assert.deepEqual(AVAILABLE_SEATS, ['7', '8', '9', '10', '11', '12', '13']);
  assert.deepEqual(BOOKED_SEATS, []);

  const bookedSeats = getBookedSeatNumbersForDate('2099-01-01');
  assert.equal(bookedSeats.includes('6'), true);
  assert.equal(bookedSeats.includes('14'), true);
  assert.equal(bookedSeats.includes('7'), false);
});
