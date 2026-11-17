import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bus,
  Calendar,
  Clock,
  ShieldCheck,
  CreditCard,
  Phone,
  Sparkles,
  MapPin,
  CheckCircle2,
  Users,
  Star,
  ChevronRight,
  Armchair,
  Zap,
  ArrowRight
} from 'lucide-react';
import { BUS_CONFIG } from '../config/seatBookingConfig.js';

export default function Home() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [selectedStop, setSelectedStop] = useState(BUS_CONFIG.boardingStops[0]);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    navigate(`/book?date=${selectedDate}&stop=${encodeURIComponent(selectedStop)}`);
  };

  return (
    <div className="space-y-14 sm:space-y-20 pb-12 sm:pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white pt-10 pb-16 sm:py-24">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#b91c1c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        {/* Ambient colored lighting orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-950/90 to-red-900/80 border border-red-500/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-red-200 shadow-lg shadow-red-950/50">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Bettiah Se Patna Ka Sabse Shandar Safar</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
              Bettiah Se Patna <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-400 bg-clip-text text-transparent">
                Har Raat 10:00 PM Express
              </span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Goswami Travels ke sath aaramdayak aur surakshit safar ka anubhav karein. Apni pasandeeda seat online chunein, WhatsApp par instant booking confirm karein aur payment bus boarding ke waqt counter par dein!
            </p>
          </div>

          {/* Luxury Bus Showcase Card (Featuring User's Bus Image) */}
          <div className="relative max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-stone-800/80 via-stone-900/90 to-stone-950 border border-white/10 shadow-[0_25px_60px_-15px_rgba(185,28,28,0.35)] backdrop-blur-xl group overflow-hidden">
              
              {/* Bus Image Container */}
              <div className="relative rounded-2xl overflow-hidden bg-stone-900 aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center">
                <img
                  src={BUS_CONFIG.busHeroImage}
                  alt="Goswami Travels Luxury AC Sleeper Bus"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette gradient over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none"></div>

                {/* Floating Badge Top-Left: Model specs */}
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
                  <div className="inline-flex items-center gap-2 bg-stone-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>2+2 AC Sleeper Coach</span>
                  </div>
                </div>

                {/* Floating Badge Top-Right: Price */}
                <div className="absolute top-3 right-3 sm:top-5 sm:right-5">
                  <div className="inline-flex items-center gap-1.5 bg-red-700/90 backdrop-blur-md border border-red-500/50 text-white text-[11px] sm:text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
                    <span>Kiraya: ₹380 - ₹400</span>
                  </div>
                </div>

                {/* Floating Badge Bottom Info Bar */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-center justify-between gap-2 text-white">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold bg-stone-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Departure: 10:00 PM Bettiah Depot</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs font-semibold bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>GPS & Charging Point Enabled</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Booking & Feature Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Value Highlights in Hinglish */}
            <div className="lg:col-span-6 space-y-5">
              <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 sm:p-6 backdrop-blur-md space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Armchair className="w-5 h-5 text-red-500" />
                  <span>Har Yatri Ke Liye Shandar Suvidha</span>
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/70">
                    <span className="text-stone-400 block font-semibold">Regular Seater</span>
                    <strong className="text-base font-black text-white">₹380 Matra</strong>
                    <p className="text-[11px] text-stone-400 mt-0.5">Seats 1 se 30 tak (Aaramdayak pushback)</p>
                  </div>
                  <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/70">
                    <span className="text-stone-400 block font-semibold">Sleeper Berth</span>
                    <strong className="text-base font-black text-indigo-400">₹400 Matra</strong>
                    <p className="text-[11px] text-stone-400 mt-0.5">Berths 31 se 40 tak (Sone ke liye)</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-950/50 to-stone-800/80 p-3.5 rounded-xl border border-amber-600/30 flex items-center justify-between">
                  <div>
                    <span className="text-amber-400 font-bold text-xs">Seats 7 Se 13: Priority Front Cabin</span>
                    <p className="text-[11px] text-stone-300">Driver cabin ke paas, extra pair phailane ki jagah aur aasan utarna</p>
                  </div>
                  <span className="text-xs bg-amber-400 text-stone-950 font-black px-2 py-0.5 rounded-md shrink-0">
                    VIP Row
                  </span>
                </div>
              </div>

              {/* Trust highlights */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-stone-900/40 border border-stone-800/80 p-3 rounded-xl">
                  <Clock className="w-5 h-5 text-red-400 mx-auto mb-1.5" />
                  <strong className="text-white block font-bold">10:00 PM Sharp</strong>
                  <span className="text-stone-400 text-[10px]">Roz samay par rawana</span>
                </div>
                <div className="bg-stone-900/40 border border-stone-800/80 p-3 rounded-xl">
                  <Phone className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
                  <strong className="text-white block font-bold">WhatsApp Ticket</strong>
                  <span className="text-stone-400 text-[10px]">Instant confirmation</span>
                </div>
                <div className="bg-stone-900/40 border border-stone-800/80 p-3 rounded-xl">
                  <CreditCard className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
                  <strong className="text-white block font-bold">Counter Payment</strong>
                  <span className="text-stone-400 text-[10px]">No advance deduction</span>
                </div>
              </div>
            </div>

            {/* Right: Quick Search Form Card */}
            <div className="lg:col-span-6">
              <div className="bg-white text-stone-900 rounded-3xl shadow-2xl p-6 sm:p-8 border-t-4 border-red-700">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div>
                    <h2 className="text-xl font-black text-stone-900">Safar Ki Seat Chunein</h2>
                    <p className="text-xs text-stone-500">Date aur boarding stop select karke seat dekhein</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center text-red-700 font-black text-xs shadow-xs">
                    BUS
                  </div>
                </div>

                <form onSubmit={handleQuickSearch} className="mt-5 space-y-4">
                  {/* Origin to Destination */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Kahan Se (Origin)</span>
                      <span className="text-sm font-black text-stone-900">Bettiah</span>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Kahan Tak (Destination)</span>
                      <span className="text-sm font-black text-stone-900">Patna</span>
                    </div>
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label htmlFor="home-date" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                      Safar Ki Tareekh (Date)
                    </label>
                    <input
                      id="home-date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-red-700 focus:outline-none"
                    />
                  </div>

                  {/* Boarding Point */}
                  <div>
                    <label htmlFor="home-stop" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                      Aapka Boarding Point (Chadhne Ki Jagah)
                    </label>
                    <select
                      id="home-stop"
                      value={selectedStop}
                      onChange={(e) => setSelectedStop(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-red-700 focus:outline-none"
                    >
                      {BUS_CONFIG.boardingStops.map((stop) => (
                        <option key={stop} value={stop}>
                          {stop}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Timing Pill */}
                  <div className="flex items-center justify-between text-xs text-stone-500 py-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      Raat 10:00 PM Bettiah Se
                    </span>
                    <span className="font-medium text-stone-700">Subah 05:30 AM Patna</span>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-black py-4 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer text-sm"
                  >
                    <span>Khali Seats Dekhein Aur Book Karein</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="text-center text-[11px] text-stone-500 pt-1">
                    Online card ki zarurat nahi hai. Boarding ke samay counter par pay karein.
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Boarding Route Timeline in Hinglish */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
            Yatra Marg & Boarding Halts
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-3">
            Raste Ke Sabhi Boarding Points
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Aap apni suvidha ke hisab se kisi bhi stop se bus pakad sakte hain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { name: 'Bettiah Stand', time: '10:00 PM (Raat)', desc: 'Counter #4, Private Bus Stand', tag: 'Starting Point' },
            { name: 'Gajdishpur', time: '10:40 PM', desc: 'Main Highway Chowk, SBI ATM ke paas', tag: 'Stop 1' },
            { name: 'Paharpur', time: '11:15 PM', desc: 'Petrol Pump Waiting Shed', tag: 'Stop 2' },
            { name: 'Areraj', time: '11:55 PM', desc: 'Someshwar Nath Mandir Gate', tag: 'Stop 3' },
            { name: 'Khajuria', time: '12:40 AM (Aadhi Raat)', desc: 'Khajuria NH-28 Crossing Point', tag: 'Stop 4' },
          ].map((point) => (
            <div key={point.name} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs relative hover:border-red-300 transition-colors">
              <span className="text-[10px] font-bold uppercase bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                {point.tag}
              </span>
              <h3 className="text-base font-bold text-stone-900 mt-2">{point.name}</h3>
              <p className="text-xs font-black text-red-700 mt-1">{point.time}</p>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Priority Seats Section (Seats 7 to 13) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-950 via-stone-900 to-red-900 text-white rounded-3xl p-7 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="bg-amber-400 text-stone-950 text-xs font-black uppercase px-3.5 py-1 rounded-full shadow-xs">
              Special Recommendation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Priority Front Seats (Seats 7 Se 13)
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Driver cabin ke theek peeche wali row (Seats 7 se 13) sabse shaant aur aaramdayak hoti hai. Yahan jhatke kam lagte hain, pair phailane ki jagah milti hai aur bus rukte hi turant utarna aasan hota hai!
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/book')}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>Priority Seat 7-13 Book Karein</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Passenger Reviews in Hinglish */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-black text-stone-900">Humare Regular Yatrio Ka Anubhav</h2>
          <p className="text-xs text-stone-500 mt-1">Bettiah aur Areraj se Patna jane wale aam logo ke reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Vivek Pandey',
              from: 'Bettiah se AIIMS Patna',
              comment: 'Medical conference ke liye har mahine travel karta hoon. 10:00 PM par bus bilkul right time nikalti hai aur Seat 9 par legroom behtareen hai.',
              rating: 5
            },
            {
              name: 'Anjali Srivastava',
              from: 'Areraj se Patna Junction',
              comment: 'Family aur mahilao ke liye safe bus hai. Areraj aane se 10 minute pehle conductor bhaiya ne call karke bata diya tha. Sleeper berth bilkul saaf tha.',
              rating: 5
            },
            {
              name: 'Manish Verma',
              from: 'Bettiah se Gandhi Maidan',
              comment: 'WhatsApp par booking 1 minute mein ho gayi. Counter par jakar bina kisi extra charge ke ticket mil gaya. Superb service!',
              rating: 5
            }
          ].map((rev, i) => (
            <div key={i} className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 space-y-3 shadow-2xs">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: rev.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700 italic leading-relaxed">"{rev.comment}"</p>
              <div className="pt-2 border-t border-stone-200">
                <p className="text-xs font-bold text-stone-900">{rev.name}</p>
                <p className="text-[11px] text-stone-500">{rev.from}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
