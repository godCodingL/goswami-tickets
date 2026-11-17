import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bus, Phone, Menu, X, Shield, CalendarCheck } from 'lucide-react';
import { BUS_CONFIG } from '../config/seatBookingConfig.js';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Seat Book Karein', path: '/book' },
    { name: 'Route & Samay', path: '/routes' },
    { name: 'Counter & Madad', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top micro banner */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-1 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Bettiah se Patna Har Raat 10:00 PM Express • AC & Sleeper Coach</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span>Counter Help: <strong className="text-white">+91 77630 43712</strong></span>
            <span className="text-stone-600">|</span>
            <span className="text-amber-400 font-semibold">Payment Bus Boarding Par De Sakte Hain</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 sm:h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-700 via-red-800 to-stone-950 flex items-center justify-center text-white shadow-md shadow-red-700/20 group-hover:scale-105 transition-transform">
              <Bus className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 group-hover:text-red-700 transition-colors">
                  GOSWAMI
                </span>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-red-100 text-red-800 px-2 py-0.5 rounded-full border border-red-200">
                  TRAVELS
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                Bettiah se Patna Daily Night Service
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-red-50 text-red-700 font-bold shadow-2xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/admin/dashboard"
              className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800"
            >
              <Shield className="w-3.5 h-3.5 text-red-700" />
              Local Demo
            </Link>

            {/* Quick WhatsApp Support */}
            <a
              href={`https://wa.me/${BUS_CONFIG.whatsappNumber}?text=Namaste%20Goswami%20Travels%2C%20mujhe%20bus%20ticket%20ke%20bare%20mein%20puchhna%20hai`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Madad</span>
            </a>

            {/* Book Now Primary Button */}
            <Link
              to="/book"
              className="ml-1 inline-flex items-center gap-1.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Seat Chunein</span>
            </Link>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/book"
              className="bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs"
            >
              Book Karein
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="Menu kholein"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3.5 py-2.5 rounded-xl text-base font-semibold ${
                isActive(link.path)
                  ? 'bg-red-50 text-red-700 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-stone-200 space-y-2">
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2 text-xs font-semibold text-stone-700"
            >
              Local Demo Dashboard
            </Link>
            <a
              href={`https://wa.me/${BUS_CONFIG.whatsappNumber}?text=Namaste%20Goswami%20Travels%2C%20mujhe%20bus%20ticket%20book%20karni%20hai`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm shadow-xs"
            >
              <Phone className="w-4 h-4" />
              Direct WhatsApp Helpline (+91 77630 43712)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
