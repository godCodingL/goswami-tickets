import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Ticket, Clock, Phone, MessageSquare } from 'lucide-react';
import { BUS_CONFIG } from '../config/seatBookingConfig.js';

export default function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Book Karein', path: '/book', icon: Ticket, highlight: true },
    { label: 'Timings', path: '/routes', icon: Clock },
    { label: 'Counter', path: '/contact', icon: Phone },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-950/95 backdrop-blur-lg border-t border-stone-800 px-3 py-2 shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          if (item.highlight) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative -top-3 flex flex-col items-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-700 to-red-600 text-white flex items-center justify-center shadow-lg shadow-red-700/40 ring-4 ring-stone-950 group-active:scale-95 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-red-400 mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
                active ? 'text-red-500 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}

        {/* WhatsApp Quick Chat */}
        <a
          href={`https://wa.me/${BUS_CONFIG.whatsappNumber}?text=Namaste%20Goswami%20Travels%2C%20mujhe%20bus%20ticket%20ke%20bare%20mein%20puchhna%20hai`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center py-1 px-2.5 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <MessageSquare className="w-5 h-5 mb-0.5 text-emerald-400" />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
