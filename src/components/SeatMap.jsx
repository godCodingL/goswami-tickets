import React from 'react';
import { clsx } from 'clsx';
import { BUS_CONFIG } from '../config/seatBookingConfig.js';
import { isPrioritySeat, isSleeperSeat, getSeatPrice } from '../services/seatBookingService.js';

export default function SeatMap({
  seats = [],
  bookedSeatNumbers = [],
  selectedSeatNumbers = [],
  onSeatToggle,
}) {
  // Sort seats numerically 1 to 40
  const sortedSeats = [...seats].sort(
    (a, b) => parseInt(a.seat_number, 10) - parseInt(b.seat_number, 10)
  );

  return (
    <div className="w-full max-w-md mx-auto bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm">
      {/* Legend */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-6 pb-4 border-b border-stone-200">
        <span className="text-xs font-semibold flex items-center gap-1.5 text-stone-700">
          <span className="w-3.5 h-3.5 bg-green-100 border border-green-500 rounded"></span> Available
        </span>
        <span className="text-xs font-semibold flex items-center gap-1.5 text-stone-700">
          <span className="w-3.5 h-3.5 bg-blue-600 border border-blue-700 rounded"></span> Selected
        </span>
        <span className="text-xs font-semibold flex items-center gap-1.5 text-stone-700">
          <span className="w-3.5 h-3.5 bg-red-100 border border-red-400 rounded"></span> Booked
        </span>
        <span className="text-xs font-semibold flex items-center gap-1.5 text-stone-700">
          <span className="w-3.5 h-3.5 border-2 border-amber-400 bg-white rounded ring-1 ring-amber-300"></span> Priority (7-13)
        </span>
      </div>

      {/* Bus Front cabin indicator */}
      <div className="flex items-center justify-between mb-6 px-3 py-2 bg-stone-100 rounded-lg text-xs font-medium text-stone-500">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Front Entry Door</span>
        </div>
        <div className="flex items-center gap-2" title="Driver Cabin">
          <span>Driver</span>
          {/* Steering wheel indicator */}
          <div className="w-7 h-7 rounded-full border-3 border-stone-500 border-r-transparent flex items-center justify-center">
            <div className="w-2 h-2 bg-stone-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Seats Grid: 5 columns (Left 2, Aisle 1, Right 2) */}
      <div className="grid grid-cols-5 gap-2.5 sm:gap-3.5 justify-items-center">
        {sortedSeats.map((seat, index) => {
          const seatNum = seat.seat_number;
          const isBooked = bookedSeatNumbers.includes(String(seatNum));
          const isSelected = selectedSeatNumbers.includes(String(seatNum));
          const isPriority = isPrioritySeat(seatNum);
          const isSleeper = isSleeperSeat(seatNum);
          const price = getSeatPrice(seatNum);

          // 2x2 layout with center aisle
          const rowMod = index % 4;
          let colClass = '';
          if (rowMod === 0) colClass = 'col-start-1';
          else if (rowMod === 1) colClass = 'col-start-2';
          else if (rowMod === 2) colClass = 'col-start-4';
          else if (rowMod === 3) colClass = 'col-start-5';

          const statusText = isBooked
            ? 'Booked'
            : !seat.active
            ? 'Blocked'
            : isSelected
            ? 'Selected'
            : 'Available';

          return (
            <button
              key={seat.id || seat.seat_number}
              type="button"
              disabled={isBooked || !seat.active}
              onClick={() => onSeatToggle(String(seatNum))}
              aria-label={`Seat ${seatNum}, ${isSleeper ? 'Sleeper' : 'Regular'}, ₹${price}, ${statusText}`}
              className={clsx(
                'relative h-11 w-11 sm:h-12 sm:w-12 rounded-t-lg rounded-b-sm font-bold text-xs sm:text-sm transition-all flex flex-col items-center justify-center border-2 shadow-xs cursor-pointer select-none active:scale-95',
                colClass,
                {
                  'bg-green-100 border-green-500 text-green-900 hover:bg-green-200 hover:border-green-600':
                    !isBooked && !isSelected && seat.active,
                  'bg-blue-600 border-blue-700 text-white shadow-md scale-105': isSelected,
                  'bg-red-50 border-red-300 text-red-700 opacity-60 cursor-not-allowed': isBooked,
                  'bg-stone-200 border-stone-300 text-stone-400 opacity-60 cursor-not-allowed':
                    !seat.active,
                  'ring-2 ring-amber-400 ring-offset-2': isPriority && !isBooked && seat.active,
                }
              )}
            >
              <span>{seatNum}</span>
              {isSleeper && (
                <span
                  title="Sleeper Berth - ₹400"
                  className={clsx(
                    'absolute -top-1.5 -right-1.5 text-[9px] px-1 py-0.2 rounded-full font-bold shadow-xs',
                    isSelected ? 'bg-amber-300 text-stone-900' : 'bg-indigo-600 text-white'
                  )}
                >
                  S
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Seat layout guide & price summary from config */}
      <div className="mt-6 pt-4 border-t border-stone-200 flex justify-between text-xs text-stone-600">
        <div>
          <span className="font-semibold text-stone-800">Regular (1-30):</span> ₹{BUS_CONFIG.pricing.regularSeatPrice}
        </div>
        <div>
          <span className="font-semibold text-indigo-700">Sleeper Berth (31-40):</span> ₹{BUS_CONFIG.pricing.sleeperSeatPrice}
        </div>
      </div>
    </div>
  );
}
