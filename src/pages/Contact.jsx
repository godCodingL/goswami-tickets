import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ShieldAlert,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { BUS_CONFIG } from '../config/seatBookingConfig.js';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Seat Booking Ki Jankari',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-12 pb-24 md:pb-12">
      
      {/* Title in Hinglish */}
      <div className="border-b border-stone-200 pb-6 sm:pb-8 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-3.5 py-1 rounded-full">
          24/7 Yatri Sahayata Aur Counters
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 mt-3 tracking-tight">
          Goswami Travels Se Sampark Karein
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
          Ticket booking, parcel bhejne ya bus ki live location janne ke liye hamare counter staff se seedhe phone ya WhatsApp par baat karein.
        </p>
      </div>

      {/* Main Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* WhatsApp Card */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-emerald-950">Direct WhatsApp Helpline</h3>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              Ticket master se seedhi baat karein. Seat availability ya raste ki jaankari turant paayein.
            </p>
          </div>
          <a
            href={`https://wa.me/${BUS_CONFIG.whatsappNumber}?text=Namaste%20Goswami%20Travels%2C%20mujhe%20bus%20ticket%20ke%20bare%20mein%20puchhna%20hai`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-3 px-4 rounded-xl shadow-xs transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp Par Chat Karein ({BUS_CONFIG.phoneDisplay})</span>
          </a>
        </div>

        {/* Bettiah Main Office Phone */}
        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="w-12 h-12 bg-red-700 text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-stone-900">Bettiah Counter Phone</h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Private bus stand Bettiah ticket counter par subah 07:00 AM se raat 11:30 PM tak seedhe call karein.
            </p>
          </div>
          <a
            href={`tel:${BUS_CONFIG.whatsappNumber}`}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-black py-3 px-4 rounded-xl shadow-xs transition-colors"
          >
            <span>Call Karein: {BUS_CONFIG.phoneDisplay}</span>
          </a>
        </div>

        {/* Conductor Night Helpline */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="w-12 h-12 bg-amber-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-amber-950">Conductor & Night Help</h3>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              Raaste ke stops (Gajdishpur, Paharpur, Areraj) par bus aane ki live status lene ke liye.
            </p>
          </div>
          <a
            href={`tel:${BUS_CONFIG.whatsappNumber}`}
            className="mt-6 inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black py-3 px-4 rounded-xl shadow-xs transition-colors"
          >
            <span>Emergency Conductor Call</span>
          </a>
        </div>

      </div>

      {/* Physical Ticket Counters */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900">Humare Physical Ticket Counters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-3 shadow-xs">
            <span className="text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
              Mukhya Booking Office
            </span>
            <h3 className="text-base font-bold text-stone-900">Bettiah Private Bus Stand</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Counter #4, Private Bus Stand Complex, Supriya Cinema Road, Bettiah, Paschim Champaran, Bihar - 845438.
            </p>
            <div className="text-xs text-stone-500 pt-2 border-t border-stone-100 space-y-1">
              <p><strong>Khulne Ka Samay:</strong> Subah 08:00 AM se Raat 10:30 PM</p>
              <p><strong>Prabhari:</strong> Rameshwar Goswami</p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-3 shadow-xs">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md">
              Patna Arrival Desk
            </span>
            <h3 className="text-base font-bold text-stone-900">Patna ISBT / Mithapur</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Goswami Travels Desk, Platform 2 Exit Gate, Mithapur Purana Stand aur ISBT Bairiya, Patna, Bihar.
            </p>
            <div className="text-xs text-stone-500 pt-2 border-t border-stone-100 space-y-1">
              <p><strong>Khulne Ka Samay:</strong> Subah 05:00 AM se Raat 10:00 PM</p>
              <p><strong>Sampark:</strong> {BUS_CONFIG.phoneDisplay}</p>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-3xl p-6 space-y-3 shadow-xs">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md">
              Areraj Highway Agent
            </span>
            <h3 className="text-base font-bold text-stone-900">Areraj Someshwar Gate</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Maa Ambey Communication, Someshwar Nath Mandir Mukhya Gate ke samne, Areraj, Purbi Champaran.
            </p>
            <div className="text-xs text-stone-500 pt-2 border-t border-stone-100 space-y-1">
              <p><strong>Bus Pickup Samay:</strong> Raat 11:55 PM</p>
              <p><strong>Sampark:</strong> {BUS_CONFIG.phoneDisplay}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Online Query Form in Hinglish */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xs">
        <h2 className="text-lg sm:text-xl font-black text-stone-900 mb-1">Hamein Sandesh (Message) Bhejein</h2>
        <p className="text-xs text-stone-500 mb-5">
          Group booking, shadi-vivah ke liye bus ya parcel bhejne ke bare mein sawaal ho toh form bharein:
        </p>

        {formSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-black text-emerald-950">Sandesh Prapt Hua!</h3>
            <p className="text-xs text-emerald-800">
              Dhanyawad, {formData.name}. Hamara counter staff aapse mobile number {formData.phone} par jald sampark karega.
            </p>
            <button
              onClick={() => {
                setFormSubmitted(false);
                setFormData({ name: '', phone: '', subject: 'Seat Booking Ki Jankari', message: '' });
              }}
              className="text-xs font-bold text-emerald-700 underline cursor-pointer mt-2"
            >
              Doosra sandesh bhejein
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Aapka Naam
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jaise: Anand Kumar"
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-red-700 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Mobile Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit number"
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-red-700 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                Vishay (Subject)
              </label>
              <select
                id="contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-red-700 focus:outline-none bg-white"
              >
                <option value="Seat Booking Ki Jankari">Seat Booking Ki Jankari</option>
                <option value="Parcel Aur Luggage Booking">Parcel Aur Luggage Booking</option>
                <option value="Shadi / Group Bus Reservation">Shadi / Group Bus Reservation</option>
                <option value="Doosra Sawaal">Doosra Sawaal</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                Aapka Sandesh (Message)
              </label>
              <textarea
                id="contact-message"
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Apna sawaal ya yatra vivaran yahan likhein..."
                className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-red-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Sandesh Bhejein</span>
            </button>
          </form>
        )}
      </section>

    </div>
  );
}
