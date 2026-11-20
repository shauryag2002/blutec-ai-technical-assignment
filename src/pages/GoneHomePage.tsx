import React, { useEffect } from 'react';
import { BoardingPassCard } from '../components/ui/BoardingPassCard';
import { GONE_HOME_PUPPIES } from '../data/goneHome';

export const GoneHomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 select-none">
          <span className="font-script text-terracotta text-2xl font-bold">
            one ticket home
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-espresso tracking-tight mt-1">
            Gone home
          </h1>
          <p className="mt-3 font-sans text-base sm:text-lg text-espresso/80">
            Boarding pass archives of puppies who have arrived at their forever homes.
          </p>
        </div>

        {/* Boarding Passes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {GONE_HOME_PUPPIES.map((ticket) => (
            <BoardingPassCard key={ticket.id} ticket={ticket} />
          ))}
        </div>

      </div>
    </div>
  );
};

