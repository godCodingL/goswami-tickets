import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { BUS_CONFIG } from '../config/seatBookingConfig.js';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 mt-16 sm:mt-24 border-t border-stone-800 pb-16 md:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: About in Hinglish */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center text-white shadow-md">
                <Bus className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                GOSWAMI <span className="text-red-500">TRAVELS</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Bettiah se Patna tak ki sabse bharosemand aur aaramdayak daily night coach bus service. Rozana raat 10:00 PM par rawana.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Pratyek Yatri Ke Liye Surakshit Safar</span>
            </div>
          </div>

          {/* Col 2: Quick Links in Hinglish */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Zaruri Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-white transition-colors text-red-400 font-bold">Online Seat Book Karein</Link>
              </li>
              <li>
                <Link to="/routes" className="hover:text-white transition-colors">Route Aur Samay Sarani</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Counter Aur Helpdesk</Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-white transition-colors text-stone-500">Local Demo Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Boarding Stops */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Raste Ke Boarding Points
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {BUS_CONFIG.boardingStops.map((stop) => (
                <span key={stop} className="text-[11px] bg-stone-900 text-stone-300 px-2.5 py-1 rounded-lg border border-stone-800">
                  {stop.split(' ')[0]}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-stone-400 mt-2">
              <strong className="text-stone-300">Patna Mein Drop:</strong> Gandhi Maidan, Mithapur & ISBT
            </p>
          </div>

          {/* Col 4: Contact in Hinglish */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Booking Counter Help
            </h4>
            <div className="flex items-start gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <a
                  href={`https://wa.me/${BUS_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white hover:text-emerald-400"
                >
                  {BUS_CONFIG.phoneDisplay}
                </a>
                <p className="text-[11px] text-stone-400">Call ya WhatsApp 24/7 uplabdh</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-xs">
              <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Roz Raat 10:00 PM</p>
                <p className="text-[11px] text-stone-400">Bettiah Private Bus Stand Se</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-stone-400 text-[11px]">
                Counter 4, Private Bus Stand, Supriya Road, Bettiah
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Goswami Travels. Sabhi adhikar surakshit hain.</p>
          <p className="text-stone-400">
            Kiraya: Regular ₹380 | Sleeper ₹400 • Offline counter payment suvidha
          </p>
        </div>
      </div>
    </footer>
  );
}
