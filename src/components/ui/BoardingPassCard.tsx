import React from 'react';
import type { AdoptedTicket } from '../../types/content';

interface BoardingPassCardProps {
  ticket: AdoptedTicket;
}

/**
 * BoardingPassCard Component
 * 
 * Recreates the perforated "one ticket home" airline boarding pass
 * with departure/arrival airport stamps and barcode strip.
 */
export const BoardingPassCard: React.FC<BoardingPassCardProps> = ({ ticket }) => {
  return (
    <div className="relative bg-cream-light border-2 border-espresso rounded-2xl shadow-hard-md overflow-hidden flex flex-col sm:flex-row select-none">
      {/* Left Main Ticket Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-espresso/15 pb-3">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-terracotta">
              ✈ TeddyPups Boarding Pass
            </span>
            <span className="font-mono text-xs font-bold text-espresso/70">
              {ticket.flightNo || 'TP-DXB'}
            </span>
          </div>

          {/* Route: Origin -> Destination */}
          <div className="my-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-sans text-espresso/60 uppercase">Departed</p>
              <p className="font-display font-extrabold text-sm sm:text-base text-espresso">
                {ticket.origin}
              </p>
            </div>
            <div className="text-terracotta font-bold text-lg">➔</div>
            <div className="text-right">
              <p className="text-[10px] font-sans text-espresso/60 uppercase">Forever Home</p>
              <p className="font-display font-extrabold text-sm sm:text-base text-espresso">
                {ticket.destination}
              </p>
            </div>
          </div>

          {/* Puppy Name & Breed */}
          <div className="mt-2 flex items-center gap-3">
            <img
              src={ticket.image}
              alt={ticket.puppyName}
              className="w-12 h-12 rounded-full border-2 border-espresso object-cover"
            />
            <div>
              <h4 className="font-display font-bold text-lg text-espresso">{ticket.puppyName}</h4>
              <p className="font-sans text-xs text-espresso/70">{ticket.breed}</p>
            </div>
          </div>
        </div>

        {ticket.quote && (
          <p className="mt-4 font-script text-base text-terracotta font-bold">
            "{ticket.quote}"
          </p>
        )}
      </div>

      {/* Perforation Divider with Half-Circles */}
      <div className="relative flex sm:flex-col items-center justify-between">
        <div className="hidden sm:block absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FDF6EC] border-b-2 border-espresso" />
        <div className="w-full sm:w-0 sm:h-full border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-espresso/30" />
        <div className="hidden sm:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FDF6EC] border-t-2 border-espresso" />
      </div>

      {/* Right Ticket Stub */}
      <div className="p-5 sm:w-44 bg-honey-soft/50 flex flex-col justify-between items-center text-center border-t-2 sm:border-t-0 sm:border-l-2 border-espresso">
        <div>
          <span className="font-display font-bold text-xs uppercase text-espresso/80">
            Admit One
          </span>
          <p className="font-sans font-bold text-xs mt-1 text-espresso">
            {ticket.adoptedDate}
          </p>
        </div>

        {/* Faux Barcode */}
        <div className="my-3 flex items-center gap-1 h-10">
          <div className="w-1 h-full bg-espresso" />
          <div className="w-2 h-full bg-espresso" />
          <div className="w-0.5 h-full bg-espresso" />
          <div className="w-1.5 h-full bg-espresso" />
          <div className="w-1 h-full bg-espresso" />
          <div className="w-3 h-full bg-espresso" />
          <div className="w-1 h-full bg-espresso" />
          <div className="w-2 h-full bg-espresso" />
        </div>

        <span className="text-[10px] font-mono tracking-widest text-espresso/60 uppercase">
          FOREVER HOME
        </span>
      </div>
    </div>
  );
};
