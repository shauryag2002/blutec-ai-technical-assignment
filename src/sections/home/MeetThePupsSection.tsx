import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PuppyDoorCard } from '../../components/ui/PuppyDoorCard';
import { StickerButton } from '../../components/ui/StickerButton';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';
import { PUPPIES } from '../../data/puppies';
import { useResponsive } from '../../hooks/useMediaQuery';

/**
 * MeetThePupsSection Component
 * 
 * Features:
 * - Header with "Meet the pups" headline & "See all available puppies" CTA
 * - Featured arched wooden-plank doors revealing real puppy photos
 * - Walking poodle mascot with "coming?" speech bubble along paw trail
 * - Desktop: Sticky vertical scroll driving horizontal track movement with 3D doors
 * - Mobile/Tablet: Smooth horizontal swipe carousel (snap-x snap-mandatory) with tap-to-open doors
 */
export const MeetThePupsSection: React.FC = () => {
  const { isDesktop } = useResponsive();
  const targetRef = useRef<HTMLDivElement>(null);
  const featuredPuppies = PUPPIES.slice(0, 7);

  // Controlled open door state for mobile tap
  const [mobileOpenSlug, setMobileOpenSlug] = useState<string | null>(null);

  // Scroll progress for desktop sticky horizontal walk
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  // Transform vertical scroll to horizontal percentage
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-58%']);
  const poodleWalkX = useTransform(scrollYProgress, [0, 1], ['5%', '85%']);

  return (
    <section
      ref={targetRef}
      className={`relative bg-[#FFF1D8] border-b-2 border-espresso ${isDesktop ? 'h-[260vh]' : 'py-16'
        }`}
    >
      {/* DESKTOP PINNED CONTAINER */}
      <div
        className={`${isDesktop ? 'sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-12' : ''
          }`}
      >
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none mb-6">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-espresso tracking-tight">
              Meet the pups
            </h2>
            <p className="mt-2 font-sans text-sm sm:text-base text-espresso/75 max-w-lg">
              Real puppies, real photos, looking for their families right now.
            </p>
          </div>

          <StickerButton to="/puppies" variant="primary" size="md">
            See all available puppies
          </StickerButton>
        </div>

        {/* DESKTOP HORIZONTAL TRACK */}
        {isDesktop ? (
          <div className="relative flex-1 flex flex-col justify-center overflow-hidden">
            {/* Horizontal Track of Puppy Doors */}
            <motion.div
              style={{ x }}
              className="flex items-center gap-8 pl-12 pr-24"
            >
              {featuredPuppies.map((puppy) => (
                <div key={puppy.id} className="shrink-0">
                  <PuppyDoorCard puppy={puppy} />
                </div>
              ))}

              {/* End Card: Dashed Arch "Meet them all" */}
              <div className="shrink-0 flex flex-col items-center">
                <Link
                  to="/puppies"
                  className="w-56 h-80 rounded-t-[100px] rounded-b-xl border-[3px] border-dashed border-espresso bg-cream-light/60 flex flex-col items-center justify-center p-6 text-center hover:bg-cream-light transition-colors group shadow-hard-md"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-espresso bg-honey-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">🐾</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-espresso mt-4">
                    Meet them all
                  </h3>
                  <p className="font-sans text-xs text-espresso/70 mt-1">
                    15 puppies looking for a home
                  </p>
                  <span className="mt-4 text-xs font-display font-bold text-terracotta underline">
                    View catalogue →
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Walking Poodle on the Floor with Paw Trail */}
            <div className="relative mt-8 w-full border-t-2 border-dashed border-espresso/30 pt-3">
              <motion.div
                style={{ left: poodleWalkX }}
                className="absolute -top-12 z-20"
              >
                <PoodleMascot
                  pose="walk"
                  className="w-24 h-20"
                  bubbleText="coming? 🐾"
                />
              </motion.div>
            </div>
          </div>
        ) : (
          /* MOBILE / TABLET SNAP-X CAROUSEL */
          <div className="mt-8">
            <div className="flex gap-5 overflow-x-auto pb-6 px-4 snap-x snap-mandatory scrollbar-none">
              {featuredPuppies.map((puppy) => (
                <div key={puppy.id} className="shrink-0 snap-center">
                  <PuppyDoorCard
                    puppy={puppy}
                    isOpenControlled={mobileOpenSlug === puppy.slug}
                    onToggleOpen={() =>
                      setMobileOpenSlug((prev) => (prev === puppy.slug ? null : puppy.slug))
                    }
                  />
                </div>
              ))}

              {/* Mobile End Card */}
              <div className="shrink-0 snap-center flex items-center">
                <Link
                  to="/puppies"
                  className="w-56 h-80 rounded-t-[100px] rounded-b-xl border-[3px] border-dashed border-espresso bg-cream-light flex flex-col items-center justify-center p-6 text-center shadow-hard-md"
                >
                  <span className="text-2xl">🐾</span>
                  <h3 className="font-display font-bold text-xl text-espresso mt-2">
                    Meet them all
                  </h3>
                  <p className="font-sans text-xs text-espresso/70 mt-1">
                    15 available puppies
                  </p>
                  <span className="mt-4 text-xs font-display font-bold text-terracotta">
                    View catalogue →
                  </span>
                </Link>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <PoodleMascot pose="sit" className="w-16 h-14" bubbleText="swipe to peek ➔" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

