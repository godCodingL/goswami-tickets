import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  CalendarCheck,
  Zap,
  Shield,
  Coffee,
  CheckCircle2,
  Navigation,
  ArrowRight
} from 'lucide-react';
import { BUS_CONFIG } from '../config/seatBookingConfig.js';

export default function RouteTimings() {
  const stopsTimeline = [
    {
      stop: 'Bettiah (Bus Stand)',
      time: '10:00 PM (Raat)',
      landmark: 'Private Bus Stand Counter #4, Supriya Cinema Road',
      type: 'Origin / Depot Starting',
      distance: '0 km'
    },
    {
      stop: 'Gajdishpur Chowk',
      time: '10:40 PM',
      landmark: 'Main Highway Chowk, SBI ATM ke paas',
      type: 'Yatri Boarding Point',
      distance: '18 km'
    },
    {
      stop: 'Paharpur',
      time: '11:15 PM',
      landmark: 'Paharpur Petrol Pump / Waiting Shed',
      type: 'Yatri Boarding Point',
      distance: '34 km'
    },
    {
      stop: 'Areraj',
      time: '11:55 PM',
      landmark: 'Someshwar Nath Mandir Gate, Main Road',
      type: 'Pramukh Town Halt',
      distance: '52 km'
    },
    {
      stop: 'Khajuria Crossing',
      time: '12:40 AM (Aadhi Raat)',
      landmark: 'Khajuria NH-28 Flyover Junction',
      type: 'Highway Boarding Stop',
      distance: '76 km'
    },
    {
      stop: 'Muzaffarpur Bypass',
      time: '02:30 AM',
      landmark: 'NH Toll Plaza ke paas Tea & Refreshment Halt',
      type: '10-Minute Chai/Washroom Break',
      distance: '135 km'
    },
    {
      stop: 'Hajipur / JP Setu Approach',
      time: '04:30 AM (Bhor)',
      landmark: 'Ramashish Chowk & Ganga Pul Approach',
      type: 'En-route Drop Point',
      distance: '185 km'
    },
    {
      stop: 'Patna (Mithapur & Gandhi Maidan)',
      time: '05:30 AM (Subah)',
      landmark: 'Mithapur Bus Stand / Gandhi Maidan Gate #5 / ISBT Bairiya',
      type: 'Final Destination Drop',
      distance: '210 km'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-12 pb-24 md:pb-12">
      
      {/* Header in Hinglish */}
      <div className="border-b border-stone-200 pb-6 sm:pb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
          Official Samay Sarani (Timetable)
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 mt-3 tracking-tight">
          Route, Raste Ke Stops Aur Timing
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
          Bettiah se lekar Patna tak roz raat chalne wali express bus ka poora schedule. Saal ke 365 din bilkul right time service.
        </p>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 bg-stone-50 border border-stone-200/80 p-4 sm:p-5 rounded-2xl">
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Kul Doori (Distance)</span>
          <strong className="text-base sm:text-lg font-black text-stone-900">~210 Kilometers</strong>
        </div>
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Safar Ka Samay</span>
          <strong className="text-base sm:text-lg font-black text-stone-900">7.5 Ghante</strong>
        </div>
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Rozana Departure</span>
          <strong className="text-base sm:text-lg font-black text-stone-900">Raat 10:00 PM</strong>
        </div>
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Seat Kiraya</span>
          <strong className="text-base sm:text-lg font-black text-red-700">₹380 - ₹400</strong>
        </div>
      </div>

      {/* Bettiah se Patna Timeline */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">Bettiah Se Patna Ka Samay</h2>
            <p className="text-xs text-stone-500">Night Coach Stop-wise Schedule</p>
          </div>
          <Link
            to="/book"
            className="inline-flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-xs"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Seat Chunein</span>
          </Link>
        </div>

        <div className="relative border-l-2 border-red-300 ml-4 pl-6 space-y-6 sm:space-y-8">
          {stopsTimeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <div
                className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 ${
                  idx === 0 || idx === stopsTimeline.length - 1
                    ? 'bg-red-700 border-white ring-2 ring-red-400'
                    : 'bg-white border-red-500'
                }`}
              />

              <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-stone-900">{item.stop}</h3>
                    <span className="text-[10px] sm:text-[11px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-black text-red-700">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    {item.landmark}
                  </span>
                  <span className="font-medium text-stone-400">{item.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wapasi Ka Route (Patna Se Bettiah) */}
      <section className="bg-stone-50 border border-stone-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900">Wapasi Ka Safar: Patna Se Bettiah</h2>
        <p className="text-xs text-stone-600 leading-relaxed">
          Patna se wapas Bettiah aane wale yatrio ke liye roz sham ki return bus:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-stone-200">
            <span className="text-stone-400 block font-semibold">Patna Mein Boarding</span>
            <strong className="text-sm text-stone-900">Mithapur & Gandhi Maidan</strong>
            <p className="text-stone-500 mt-1">Rawana: Roz Raat 09:30 PM</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200">
            <span className="text-stone-400 block font-semibold">Raste Ke Drops</span>
            <strong className="text-sm text-stone-900">Khajuria, Areraj, Paharpur</strong>
            <p className="text-stone-500 mt-1">Subah 02:30 AM se 04:15 AM ke beech</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200">
            <span className="text-stone-400 block font-semibold">Bettiah Pahunchne Ka Samay</span>
            <strong className="text-sm text-stone-900">Bettiah Bus Stand</strong>
            <p className="text-stone-500 mt-1">Expected: Subah 05:00 AM</p>
          </div>
        </div>
      </section>

      {/* Bus Amenities in Hinglish */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900">Bus Ki Vishesh Suvidhayein</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center mx-auto">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Mobile Charging</h4>
            <p className="text-[11px] text-stone-500">Har seat ke paas USB point</p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Sleeper Berths</h4>
            <p className="text-[11px] text-stone-500">Saaf gaddedaar bunks raat mein aaram ke liye</p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">Surakshit Luggage</h4>
            <p className="text-[11px] text-stone-500">Bada luggage locker saman rakhne ke liye</p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
              <Navigation className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-stone-900">GPS Tracking</h4>
            <p className="text-[11px] text-stone-500">Live location monitoring suraksha ke liye</p>
          </div>
        </div>
      </section>

      {/* Call to action card */}
      <div className="bg-gradient-to-r from-red-800 to-red-700 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h3 className="text-lg sm:text-xl font-black">Aaj Raat Safar Karna Hai?</h3>
          <p className="text-red-100 text-xs mt-1">Sirf 1 minute mein WhatsApp par apni manpasand seat book karein.</p>
        </div>
        <Link
          to="/book"
          className="bg-white hover:bg-stone-100 text-red-800 font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shrink-0 shadow-md active:scale-95"
        >
          Seat Book Karein
        </Link>
      </div>

    </div>
  );
}
