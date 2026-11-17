import React, { useState, useEffect } from 'react';
import { BUS_CONFIG } from '../../config/seatBookingConfig.js';
import {
  getSeatsList,
  toggleSeatActiveStatus,
  getAllBookings,
  createSeatBooking,
  updateBookingStatus,
  updatePaymentStatus,
  deleteBooking,
  isPrioritySeat,
  calculateTotalFare
} from '../../services/seatBookingService.js';
import {
  RefreshCw,
  Search,
  Printer,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  const [seats, setSeats] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('priority'); // 'priority', 'allSeats', 'bookings', 'counterBooking', 'manifest'

  // Counter booking state
  const [counterForm, setCounterForm] = useState({
    name: '',
    phone: '',
    boardingStop: BUS_CONFIG.boardingStops[0],
    seatNumbers: [],
    paymentStatus: 'paid'
  });
  const [counterBookingMsg, setCounterBookingMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    const seatList = getSeatsList();
    const bookingList = getAllBookings();
    setSeats(seatList);
    setBookings(bookingList);
    setLoading(false);
  };

  const handleToggleSeat = (seatNumber, currentStatus) => {
    const updated = toggleSeatActiveStatus(seatNumber);
    setSeats(updated);
  };

  // Filter priority seats 7-13
  const targetSeats = seats.filter((s) => isPrioritySeat(s.seat_number));

  // Update booking status
  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    const updated = updateBookingStatus(bookingId, newStatus);
    setBookings(updated);
  };

  // Update payment status
  const handleUpdatePaymentStatus = (bookingId, newStatus) => {
    const updated = updatePaymentStatus(bookingId, newStatus);
    setBookings(updated);
  };

  // Issue offline counter booking
  const handleCreateCounterBooking = (e) => {
    e.preventDefault();
    if (counterForm.seatNumbers.length === 0) {
      alert('Please select at least one seat for counter passenger.');
      return;
    }

    try {
      const res = createSeatBooking({
        journeyDate: selectedDate,
        passengerName: counterForm.name.trim(),
        passengerPhone: counterForm.phone.trim(),
        boardingStop: counterForm.boardingStop,
        seatNumbers: counterForm.seatNumbers,
        source: 'counter',
        paymentStatus: counterForm.paymentStatus,
        bookingStatus: 'confirmed'
      });

      setCounterBookingMsg(`Counter Ticket Issued! Ref ID: ${res.bookingRef} for Seats: ${counterForm.seatNumbers.join(', ')}`);
      setCounterForm({
        name: '',
        phone: '',
        boardingStop: BUS_CONFIG.boardingStops[0],
        seatNumbers: [],
        paymentStatus: 'paid'
      });
      loadData();
    } catch (err) {
      alert('Booking error: ' + err.message);
    }
  };

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.passenger_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.passenger_phone?.includes(searchQuery) ||
      b.booking_reference?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.booking_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-red-700 text-white px-2.5 py-0.5 rounded">
              Bus Operator Control Panel
            </span>
            <span className="text-xs text-stone-400">Route: {BUS_CONFIG.origin} to {BUS_CONFIG.destination}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
            Local Demo Dashboard
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Demo data is saved only in this browser and is not shared or protected.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="inline-flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab('priority')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'priority'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          Priority Seats (7-13)
        </button>
        <button
          onClick={() => setActiveTab('allSeats')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'allSeats'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          All Seats Fleet (1-40)
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          Bookings List ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('counterBooking')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'counterBooking'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          + Offline Counter Booking
        </button>
        <button
          onClick={() => setActiveTab('manifest')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === 'manifest'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          Passenger Manifest Chart
        </button>
      </div>

      {/* TAB 1: Priority Seat Management (Seats 7-13) */}
      {activeTab === 'priority' && (
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div>
              <h2 className="text-xl font-bold text-red-700">
                Priority Seat Management (Seats 7-13)
              </h2>
              <p className="text-xs text-stone-500">
                Control individual availability for front cabin preferred passenger seats.
              </p>
            </div>
            <span className="text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full">
              {BUS_CONFIG.prioritySeats.length} Priority Seats Configured
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-stone-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 text-xs">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-6 py-3.5 text-left font-bold text-stone-600 uppercase tracking-wider">
                    Seat Number
                  </th>
                  <th className="px-6 py-3.5 text-left font-bold text-stone-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3.5 text-left font-bold text-stone-600 uppercase tracking-wider">
                    Base Fare
                  </th>
                  <th className="px-6 py-3.5 text-left font-bold text-stone-600 uppercase tracking-wider">
                    Current Status
                  </th>
                  <th className="px-6 py-3.5 text-right font-bold text-stone-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-200">
                {targetSeats.map((seat) => (
                  <tr key={seat.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-black text-stone-900 text-sm flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                        {seat.seat_number}
                      </span>
                      <span>Priority Seat {seat.seat_number}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-stone-700 font-medium">
                      {seat.seat_category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-stone-900 font-bold">
                      ₹{seat.price || BUS_CONFIG.pricing.regularSeatPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 inline-flex text-[11px] leading-5 font-bold rounded-full ${
                          seat.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {seat.active ? 'Available' : 'Unavailable (Blocked)'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                      <button
                        onClick={() => handleToggleSeat(seat.seat_number, seat.active)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          seat.active
                            ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        }`}
                      >
                        {seat.active ? 'Block Seat' : 'Unblock Seat'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 2: Full Seat Fleet (1 to 40) */}
      {activeTab === 'allSeats' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Complete Bus Fleet (Seats 1-40)</h2>
              <p className="text-xs text-stone-500">Regular (1-30) & Sleeper Berths (31-40)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
            {seats.map((seat) => (
              <div
                key={seat.id}
                className={`p-3 rounded-xl border text-center space-y-1.5 ${
                  seat.active
                    ? 'bg-white border-stone-200 shadow-2xs'
                    : 'bg-stone-100 border-stone-300 opacity-60'
                }`}
              >
                <div className="text-sm font-black text-stone-900">Seat {seat.seat_number}</div>
                <div className="text-[10px] text-stone-500">{seat.seat_category}</div>
                <button
                  onClick={() => handleToggleSeat(seat.seat_number, seat.active)}
                  className={`w-full py-1 rounded text-[10px] font-bold cursor-pointer ${
                    seat.active
                      ? 'bg-red-100 text-red-800 hover:bg-red-200'
                      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                >
                  {seat.active ? 'Active' : 'Blocked'}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: Bookings List */}
      {activeTab === 'bookings' && (
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900">All Passenger Bookings</h2>
              <p className="text-xs text-stone-500">View and manage passenger reservations</p>
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search name, phone, ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-red-700 focus:outline-none w-48 sm:w-64"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-2 px-3 border border-stone-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-red-700 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xs border border-stone-200 overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 text-xs">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-stone-600 uppercase tracking-wider">Ref ID</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-600 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-600 uppercase tracking-wider">Passenger</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-600 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-600 uppercase tracking-wider">Boarding</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-600 uppercase tracking-wider">Seats</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-600 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-600 uppercase tracking-wider">Booking Status</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-600 uppercase tracking-wider">Payment</th>
                  <th className="px-4 py-3 text-left font-bold text-stone-600 uppercase tracking-wider">Source</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-stone-400">
                      No bookings found matching filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-red-700">
                        {b.booking_reference}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                        {b.journey_date || 'Today'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-stone-900">
                        {b.passenger_name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-stone-600">
                        {b.passenger_phone}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-stone-700">
                        {b.boarding_stop}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-stone-800">
                        {Array.isArray(b.seat_numbers) ? b.seat_numbers.join(', ') : '—'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-stone-900">
                        ₹{b.total_amount}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={b.booking_status}
                          onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                          className={`text-xs font-bold rounded-lg px-2 py-1 border ${
                            b.booking_status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : b.booking_status === 'pending'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-red-50 text-red-800 border-red-300'
                          }`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={b.payment_status}
                          onChange={(e) => handleUpdatePaymentStatus(b.id, e.target.value)}
                          className={`text-xs font-bold rounded-lg px-2 py-1 border ${
                            b.payment_status === 'paid'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="paid">Paid</option>
                          <option value="pending">Pending</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-stone-500 capitalize">
                        {b.source}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 4: Offline Counter Booking */}
      {activeTab === 'counterBooking' && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6 max-w-2xl mx-auto shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded">
              Walk-in Passenger Desk
            </span>
            <h2 className="text-xl font-bold text-stone-900 mt-2">New Offline Counter Booking</h2>
            <p className="text-xs text-stone-500">Instantly issue physical receipt to counter passenger</p>
          </div>

          {counterBookingMsg && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl text-xs font-bold">
              {counterBookingMsg}
            </div>
          )}

          <form onSubmit={handleCreateCounterBooking} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Travel Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-stone-300 rounded-xl p-2.5 bg-stone-50 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Boarding Stop</label>
                <select
                  value={counterForm.boardingStop}
                  onChange={(e) => setCounterForm({ ...counterForm, boardingStop: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 bg-white font-medium"
                >
                  {BUS_CONFIG.boardingStops.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Passenger Name</label>
                <input
                  type="text"
                  required
                  placeholder="Passenger Full Name"
                  value={counterForm.name}
                  onChange={(e) => setCounterForm({ ...counterForm, name: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  value={counterForm.phone}
                  onChange={(e) => setCounterForm({ ...counterForm, phone: e.target.value })}
                  className="w-full border border-stone-300 rounded-xl p-2.5 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-2">Select Seats for Passenger:</label>
              <div className="grid grid-cols-8 gap-1.5 max-h-40 overflow-y-auto p-2 border border-stone-200 rounded-xl bg-stone-50">
                {seats.map((seat) => {
                  const isSelected = counterForm.seatNumbers.includes(seat.seat_number);
                  return (
                    <button
                      key={seat.id}
                      type="button"
                      onClick={() => {
                        setCounterForm((prev) => ({
                          ...prev,
                          seatNumbers: isSelected
                            ? prev.seatNumbers.filter((n) => n !== seat.seat_number)
                            : [...prev.seatNumbers, seat.seat_number]
                        }));
                      }}
                      className={`h-9 rounded-lg font-bold text-xs transition-colors cursor-pointer border ${
                        isSelected
                          ? 'bg-red-700 border-red-800 text-white'
                          : 'bg-white border-stone-300 text-stone-800 hover:bg-stone-100'
                      }`}
                    >
                      {seat.seat_number}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Counter Payment Status</label>
              <select
                value={counterForm.paymentStatus}
                onChange={(e) => setCounterForm({ ...counterForm, paymentStatus: e.target.value })}
                className="w-full border border-stone-300 rounded-xl p-2.5 bg-white font-medium"
              >
                <option value="paid">Cash / UPI Received at Counter (Paid)</option>
                <option value="pending">Pay on Boarding (Pending)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
            >
              Issue Counter Ticket
            </button>
          </form>
        </section>
      )}

      {/* TAB 5: Passenger Manifest for Conductor / Driver */}
      {activeTab === 'manifest' && (
        <section className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-700">Conductor Chart</span>
              <h2 className="text-xl font-bold text-stone-900 mt-1">Bus Passenger Boarding Manifest</h2>
              <p className="text-xs text-stone-500">Route: {BUS_CONFIG.origin} to {BUS_CONFIG.destination} ({BUS_CONFIG.departureTime} Express)</p>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Chart</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 text-xs">
              <thead className="bg-stone-100">
                <tr>
                  <th className="px-4 py-2.5 text-left font-bold text-stone-700">Seat(s)</th>
                  <th className="px-4 py-2.5 text-left font-bold text-stone-700">Passenger Name</th>
                  <th className="px-4 py-2.5 text-left font-bold text-stone-700">Mobile</th>
                  <th className="px-4 py-2.5 text-left font-bold text-stone-700">Boarding Point</th>
                  <th className="px-4 py-2.5 text-left font-bold text-stone-700">Booking Ref</th>
                  <th className="px-4 py-2.5 text-left font-bold text-stone-700">Payment</th>
                  <th className="px-4 py-2.5 text-left font-bold text-stone-700">Signature / Boarded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="px-4 py-3 font-black text-red-700">{Array.isArray(b.seat_numbers) ? b.seat_numbers.join(', ') : '—'}</td>
                    <td className="px-4 py-3 font-semibold text-stone-900">{b.passenger_name}</td>
                    <td className="px-4 py-3 text-stone-600">{b.passenger_phone}</td>
                    <td className="px-4 py-3 font-medium text-stone-800">{b.boarding_stop}</td>
                    <td className="px-4 py-3 text-stone-500">{b.booking_reference}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {b.payment_status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-stone-200 text-stone-300">
                      [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </div>
  );
}
