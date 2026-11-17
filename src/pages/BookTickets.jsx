import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SeatMap from '../components/SeatMap';
import { BUS_CONFIG } from '../config/seatBookingConfig.js';
import {
  getSeatsList,
  getBookedSeatNumbersForDate,
  calculateTotalFare,
  createSeatBooking,
} from '../services/seatBookingService.js';
import {
  Calendar,
  CheckCircle,
  AlertCircle,
  Printer,
  ExternalLink,
  Info,
  Phone,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function BookTickets() {
  const [searchParams] = useSearchParams();
  const initialDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const initialStop = searchParams.get('stop') || BUS_CONFIG.boardingStops[0];

  const [journeyDate, setJourneyDate] = useState(initialDate);
  const [seats, setSeats] = useState([]);
  const [bookedSeatNumbers, setBookedSeatNumbers] = useState([]);
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    boardingStop: initialStop,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successBooking, setSuccessBooking] = useState(null);

  // Seat booking service se seats load karna
  useEffect(() => {
    const seatList = getSeatsList();
    setSeats(seatList);
  }, []);

  // Safar ki date change hone par booked seats refresh karna
  useEffect(() => {
    if (!journeyDate) return;
    setError('');
    const booked = getBookedSeatNumbersForDate(journeyDate);
    setBookedSeatNumbers(booked);
    setSelectedSeatNumbers([]); // date badalne par selection reset
  }, [journeyDate]);

  // Seat map par click handle karna
  const handleSeatToggle = (seatNumber) => {
    setSelectedSeatNumbers((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((num) => num !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const totalAmount = calculateTotalFare(selectedSeatNumbers);

  // Form submit aur WhatsApp booking handle karna
  const handleBooking = (e) => {
    e.preventDefault();
    setError('');

    if (selectedSeatNumbers.length === 0) {
      setError('Kripya bus map par kam se kam ek seat chunein.');
      return;
    }
    if (!formData.name.trim()) {
      setError('Kripya yatri ka pura naam likhein.');
      return;
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      setError('Kripya 10 ankon ka valid mobile number dalein.');
      return;
    }

    setLoading(true);

    try {
      // Pure frontend booking service call
      const result = createSeatBooking({
        journeyDate,
        passengerName: formData.name.trim(),
        passengerPhone: formData.phone.trim(),
        boardingStop: formData.boardingStop,
        seatNumbers: selectedSeatNumbers,
        source: 'whatsapp',
        paymentStatus: 'pending',
        bookingStatus: 'pending',
      });

      // Confirmation slip state set karna
      setSuccessBooking({
        bookingRef: result.bookingRef,
        passengerName: formData.name,
        passengerPhone: formData.phone,
        boardingStop: formData.boardingStop,
        seats: selectedSeatNumbers,
        totalAmount: result.totalAmount,
        journeyDate,
        whatsappUrl: result.whatsappUrl,
      });

      setSelectedSeatNumbers([]);

      // WhatsApp open karne ki koshish karna
      try {
        window.open(result.whatsappUrl, '_blank');
      } catch (err) {
        console.warn('Popup blocked, WhatsApp link button screen par upalabdh hai');
      }
    } catch (err) {
      setError(err.message || 'Seat booking mein samasya aayi. Kripya doosri seat chunein.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 md:pb-12">
      
      {/* Page Title in Hinglish */}
      <div className="mb-6 sm:mb-8">
        <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-3 py-0.5 rounded-full">
          Online Seat Chunein
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight mt-1">
          Apni Bus Seat Book Karein
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-1">
          Route: <strong className="text-stone-900">{BUS_CONFIG.origin} se {BUS_CONFIG.destination}</strong> • Daily Night Coach ({BUS_CONFIG.departureTime})
        </p>
        <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mt-3">
          Frontend demo: seat selections are stored only in this browser. Contact the operator on WhatsApp to confirm availability.
        </p>
      </div>

      {/* Success Booking Receipt Banner in Hinglish */}
      {successBooking && (
        <div className="mb-8 sm:mb-10 bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-5 sm:p-8 shadow-md">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Booking Request Darj Ho Gayi
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-emerald-950">
                  Ticket Ref ID: {successBooking.bookingRef}
                </h2>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold px-3.5 py-2 rounded-xl shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>Slip Print Karein</span>
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-emerald-200 text-xs">
            <div>
              <span className="text-stone-500 block">Yatri Ka Naam</span>
              <strong className="text-stone-900 text-sm">{successBooking.passengerName}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Seat Number(s)</span>
              <strong className="text-red-700 text-sm">{successBooking.seats.join(', ')}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Safar Ki Tareekh</span>
              <strong className="text-stone-900 text-sm">
                {successBooking.journeyDate} ({BUS_CONFIG.departureTime})
              </strong>
            </div>
            <div>
              <span className="text-stone-500 block">Boarding Point</span>
              <strong className="text-stone-900 text-sm">{successBooking.boardingStop}</strong>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-emerald-200 pt-4">
            <p className="text-xs text-emerald-900 leading-relaxed">
              Neeche diye button par click karke hamare operator ko WhatsApp par message bhein. Payment bus mein chadhne ke waqt counter par cash ya UPI se dein!
            </p>
            <a
              href={successBooking.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-sm transition-all shrink-0 active:scale-95"
            >
              <span>WhatsApp Par Ticket Confirm Karein</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Date Selector & Bus Seat Map */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Date Picker Card */}
          <div className="bg-white p-5 sm:p-6 shadow-sm rounded-3xl border border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <label htmlFor="booking-journey-date" className="block text-sm font-black text-stone-900">
                  Safar Ki Tareekh Chunein
                </label>
                <p className="text-xs text-stone-500">Roz raat {BUS_CONFIG.departureTime} Bettiah Stand se</p>
              </div>
              <span className="text-[11px] font-bold bg-stone-100 text-stone-700 px-3 py-1 rounded-full self-start">
                Bettiah → Patna
              </span>
            </div>

            <input
              id="booking-journey-date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              className="w-full border border-stone-300 rounded-xl p-3 text-sm font-semibold bg-stone-50 focus:ring-2 focus:ring-red-700 focus:outline-none"
            />

            {error && (
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-red-700 bg-red-50 p-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Interactive Seat Map */}
          <div className="bg-white p-4 sm:p-6 shadow-sm rounded-3xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-stone-900">Bus Ki Seat Chunein</h2>
                <p className="text-xs text-stone-500">Khali green seat par click karein</p>
              </div>
              <div className="text-right text-xs">
                <span className="font-black text-red-700 text-sm">{selectedSeatNumbers.length}</span> seat select ki
              </div>
            </div>

            <SeatMap
              seats={seats}
              bookedSeatNumbers={bookedSeatNumbers}
              selectedSeatNumbers={selectedSeatNumbers}
              onSeatToggle={handleSeatToggle}
            />

            {/* Priority Seat Notice in Hinglish */}
            <div className="mt-4 flex items-start gap-2 bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-950">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Seats 7 se 13 (Amber Ring):</strong> Front cabin VIP seats jahan extra legroom milta hai.
              </span>
            </div>
          </div>

        </div>

        {/* Right: Passenger Form & Summary */}
        <div className="lg:col-span-5">
          {selectedSeatNumbers.length > 0 ? (
            <form
              onSubmit={handleBooking}
              className="bg-white p-5 sm:p-6 shadow-xl rounded-3xl border-t-4 border-red-700 sticky top-24 space-y-4"
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-red-700">Step 2: Yatri Vivaran</span>
                <h2 className="text-lg sm:text-xl font-black text-stone-900">Yatri Ki Jankari</h2>
              </div>

              <div className="space-y-3.5 text-sm">
                <div>
                  <label htmlFor="passenger-name" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Yatri Ka Pura Naam <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="passenger-name"
                    required
                    type="text"
                    placeholder="Jaise: Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-medium focus:ring-2 focus:ring-red-700 focus:outline-none text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="passenger-phone" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    10-Anko Ka Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="passenger-phone"
                    required
                    type="tel"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-medium focus:ring-2 focus:ring-red-700 focus:outline-none text-xs sm:text-sm"
                  />
                  <span className="text-[11px] text-stone-400 mt-0.5 block">
                    Isi number par conductor ticket verify karenge.
                  </span>
                </div>

                <div>
                  <label htmlFor="passenger-boarding-stop" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Chadhne Ka Stop (Boarding Point) <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="passenger-boarding-stop"
                    value={formData.boardingStop}
                    onChange={(e) => setFormData({ ...formData, boardingStop: e.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-stone-900 font-medium focus:ring-2 focus:ring-red-700 focus:outline-none bg-white text-xs sm:text-sm"
                  >
                    {BUS_CONFIG.boardingStops.map((stop) => (
                      <option key={stop} value={stop}>
                        {stop}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fare Summary Box in Hinglish */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
                <h3 className="font-bold text-stone-900 border-b border-stone-200 pb-2">
                  Kiraya Vivaran (Fare Summary)
                </h3>

                <div className="flex justify-between items-center text-stone-600">
                  <span>Chuni Gayi Seat:</span>
                  <span className="font-black text-stone-900 text-sm">
                    {selectedSeatNumbers.join(', ')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-stone-600">
                  <span>Safar Ka Samay:</span>
                  <span className="font-semibold text-stone-900">{BUS_CONFIG.departureTime}</span>
                </div>

                <div className="flex justify-between items-center text-stone-600">
                  <span>Tareekh:</span>
                  <span className="font-semibold text-stone-900">{journeyDate}</span>
                </div>

                <div className="border-t border-stone-200 pt-2 flex justify-between items-center text-base font-black text-red-700">
                  <span>Kul Rakam (Total):</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              {/* Desktop Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{loading ? 'Booking Ho Rahi Hai...' : 'WhatsApp Par Instant Book Karein'}</span>
              </button>

              <div className="text-[11px] text-stone-500 text-center leading-relaxed">
                ✓ Koi online advance deduction nahi hai.<br />
                ✓ Kiraya bus mein chadhne par counter par dein.
              </div>
            </form>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-dashed border-stone-300 text-center space-y-3 sticky top-24">
              <div className="w-12 h-12 bg-red-50 text-red-700 rounded-2xl flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900">Koi Seat Select Nahi Ki</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Bus map par kisi bhi green seat par click karein. Kiraya aur booking form yahan turant khul jayega.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Ultra Mobile Sticky Bottom Bar when seats are selected */}
      {selectedSeatNumbers.length > 0 && (
        <div className="md:hidden fixed bottom-[76px] left-3 right-3 z-40 p-3 bg-stone-900/95 backdrop-blur-md text-white border border-stone-700/80 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2">
          <div>
            <div className="text-[11px] text-stone-400">
              Seats: <strong className="text-white">{selectedSeatNumbers.join(', ')}</strong>
            </div>
            <div className="text-sm font-black text-amber-400">
              ₹{totalAmount} <span className="text-[10px] text-stone-400 font-normal">(Counter Pay)</span>
            </div>
          </div>
          <button
            onClick={handleBooking}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp Book</span>
          </button>
        </div>
      )}

    </div>
  );
}
