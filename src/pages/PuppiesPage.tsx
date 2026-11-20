import React, { useEffect } from 'react';
import { PuppyDoorCard } from '../components/ui/PuppyDoorCard';
import { FilterPill } from '../components/ui/FilterPill';
import { PUPPIES } from '../data/puppies';
import { usePuppyFilters } from '../hooks/usePuppyFilters';
import { PoodleMascot } from '../components/mascot/PoodleMascot';

export const PuppiesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    collection,
    breed,
    gender,
    setCollection,
    setBreed,
    setGender,
    clearFilters,
    hasActiveFilters,
    filteredPuppies
  } = usePuppyFilters(PUPPIES);

  return (
    <div className="py-12 sm:py-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 select-none">
          <span className="font-script text-terracotta text-2xl font-bold">
            our fluffy companions
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-espresso tracking-tight mt-1">
            Available puppies
          </h1>
          <p className="mt-3 font-sans text-base sm:text-lg text-espresso/80">
            {filteredPuppies.length} {filteredPuppies.length === 1 ? 'puppy' : 'puppies'} looking for a home
          </p>
        </div>

        {/* Filter Card (Taped Note Style) */}
        <div className="relative bg-cream-light border-2 border-espresso rounded-2xl p-6 shadow-hard-md mb-12 max-w-4xl mx-auto">
          {/* Top Tape Accent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-washi-yellow border border-espresso/30 opacity-80" />

          <div className="space-y-4">
            {/* Where: Everywhere, Dubai Showroom, Korean Teacup */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-espresso/60 min-w-16">
                where:
              </span>
              <FilterPill
                label="Everywhere"
                isActive={collection === 'all'}
                onClick={() => setCollection('all')}
              />
              <FilterPill
                label="In Dubai Showroom"
                isActive={collection === 'dubai'}
                onClick={() => setCollection('dubai')}
              />
              <FilterPill
                label="Korean Teacup"
                isActive={collection === 'korean-teacup'}
                onClick={() => setCollection('korean-teacup')}
              />
            </div>

            {/* Breed Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-display font-bold uppercase tracking-wider text-espresso/60 min-w-16">
                breed:
              </span>
              <FilterPill
                label="All Breeds"
                isActive={breed === 'all'}
                onClick={() => setBreed('all')}
              />
              <FilterPill
                label="Maltipoo"
                isActive={breed === 'maltipoo'}
                onClick={() => setBreed('maltipoo')}
              />
              <FilterPill
                label="Pomeranian"
                isActive={breed === 'pomeranian'}
                onClick={() => setBreed('pomeranian')}
              />
              <FilterPill
                label="Poodle"
                isActive={breed === 'poodle'}
                onClick={() => setBreed('poodle')}
              />
              <FilterPill
                label="Cavapoo"
                isActive={breed === 'cavapoo'}
                onClick={() => setBreed('cavapoo')}
              />
              <FilterPill
                label="Shih Tzu"
                isActive={breed === 'shih-tzu'}
                onClick={() => setBreed('shih-tzu')}
              />
            </div>

            {/* Gender Filter & Clear Link */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-espresso/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-espresso/60 min-w-16">
                  gender:
                </span>
                <FilterPill
                  label="All"
                  isActive={gender === 'all'}
                  onClick={() => setGender('all')}
                />
                <FilterPill
                  label="Boys"
                  isActive={gender === 'boys'}
                  onClick={() => setGender('boys')}
                />
                <FilterPill
                  label="Girls"
                  isActive={gender === 'girls'}
                  onClick={() => setGender('girls')}
                />
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-display font-bold text-terracotta hover:underline cursor-pointer"
                >
                  Clear all filters ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Puppies Grid */}
        {filteredPuppies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {filteredPuppies.map((pup) => (
              <PuppyDoorCard key={pup.id} puppy={pup} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-cream-light rounded-3xl border-2 border-dashed border-espresso max-w-lg mx-auto p-8 shadow-hard-md">
            <PoodleMascot pose="think" className="w-28 h-24 mx-auto mb-4" bubbleText="sniffing around..." />
            <h3 className="font-display font-bold text-2xl text-espresso">
              No puppies match this search
            </h3>
            <p className="font-sans text-sm text-espresso/70 mt-2">
              Try adjusting your filters, or chat with our team on WhatsApp to request a custom breed.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 inline-flex items-center px-5 py-2.5 rounded-full border-2 border-espresso bg-terracotta text-cream-light font-display font-bold text-sm shadow-hard-sm"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

