import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { PuppyDoorCard } from '../../components/ui/PuppyDoorCard';
import { StickerButton } from '../../components/ui/StickerButton';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';
import { PUPPIES } from '../../data/puppies';
import type { Puppy } from '../../types/puppy';
import { useResponsive } from '../../hooks/useMediaQuery';

// Distinct warm wood tones cycling across doors
const DOOR_WOOD_COLORS = [
  '#9E4B2E', // Rust-brown
  '#4A2C20', // Dark espresso
  '#C78E59', // Warm tan
  '#B55838', // Terracotta
  '#9E4B2E',
  '#4A2C20',
  '#C78E59'
];

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

  // Track transform
  const trackX = useTransform(scrollYProgress, [0, 1], ['0%', '-56%']);
  const poodleWalkLeft = useTransform(scrollYProgress, [0, 1], ['4%', '88%']);

  // Doors swing open as mascot passes (progress slices)
  const door1Open = useTransform(scrollYProgress, [0.05, 0.2], [false, true]);
  const door2Open = useTransform(scrollYProgress, [0.18, 0.35], [false, true]);
  const door3Open = useTransform(scrollYProgress, [0.32, 0.5], [false, true]);
  const door4Open = useTransform(scrollYProgress, [0.46, 0.65], [false, true]);
  const door5Open = useTransform(scrollYProgress, [0.6, 0.78], [false, true]);
  const door6Open = useTransform(scrollYProgress, [0.72, 0.9], [false, true]);
  const door7Open = useTransform(scrollYProgress, [0.82, 0.98], [false, true]);
  const doorOpenSignals = [door1Open, door2Open, door3Open, door4Open, door5Open, door6Open, door7Open];

  return (
    <section
      ref={targetRef}
      className={`relative bg-[#FFF1D8] border-b-[1.5px] border-espresso-border ${
        isDesktop ? 'h-[260vh]' : 'py-16'
      }`}
    >
      <div
        className={`${
          isDesktop ? 'sticky top-20 h-[calc(100vh-5rem)] overflow-hidden flex flex-col justify-between py-8' : ''
        }`}
      >
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none mb-4">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-espresso tracking-tight">
              Meet the pups
            </h2>
            <p className="mt-1.5 font-sans text-sm sm:text-base text-espresso-soft max-w-lg">
              Real puppies, real photos, looking for their families right now.
            </p>
          </div>

          <StickerButton to="/puppies" variant="primary" size="md">
            See all available puppies
          </StickerButton>
        </div>

        {/* DESKTOP HORIZONTAL TRACK WITH WALKING POODLE */}
        {isDesktop ? (
          <div className="relative flex-1 flex flex-col justify-center overflow-hidden">
            {/* Horizontal Track of Puppy Doors */}
            <motion.div
              style={{ x: trackX }}
              className="flex items-center gap-8 pl-12 pr-28"
            >
              {featuredPuppies.map((puppy, idx) => (
                <DesktopDoorWrapper
                  key={puppy.id}
                  puppy={puppy}
                  doorColor={DOOR_WOOD_COLORS[idx % DOOR_WOOD_COLORS.length]}
                  openMotionValue={doorOpenSignals[idx]}
                />
              ))}

              {/* End Card: Dashed Arch "Meet them all" */}
              <div className="shrink-0 flex flex-col items-center">
                <Link
                  to="/puppies"
                  className="w-56 h-80 rounded-t-[100px] rounded-b-xl border-[1.5px] border-dashed border-espresso-border bg-cream-light/75 flex flex-col items-center justify-center p-6 text-center hover:bg-cream-light transition-colors group shadow-card-soft"
                >
                  <div className="w-12 h-12 rounded-full border border-espresso-border bg-honey-soft flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-xl">🐾</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-espresso mt-4">
                    Meet them all
                  </h3>
                  <p className="font-sans text-xs text-espresso-soft mt-1">
                    15 puppies looking for a home
                  </p>
                  <span className="mt-3 text-xs font-sans font-bold text-terracotta underline">
                    View catalogue →
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Wooden Plank Floor along the bottom */}
            <div className="relative mt-6 w-full h-12 bg-wood border-t-[1.5px] border-espresso-border">
              {/* Wood Plank Lines */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    0deg,
                    transparent 0,
                    transparent 14px,
                    rgba(35, 23, 15, 0.25) 15px,
                    rgba(35, 23, 15, 0.35) 16px
                  )`
                }}
              />

              {/* Walking Poodle Mascot along the wooden floor */}
              <motion.div
                style={{ left: poodleWalkLeft }}
                className="absolute -top-20 z-20"
              >
                <PoodleMascot
                  pose="side-walk"
                  className="w-24 h-20"
                  bubbleText="coming? 🐾"
                />
              </motion.div>
            </div>
          </div>
        ) : (
          /* MOBILE / TABLET SNAP-X CAROUSEL */
          <div className="mt-6">
            <div className="flex gap-5 overflow-x-auto pb-6 px-4 snap-x snap-mandatory scrollbar-none">
              {featuredPuppies.map((puppy, idx) => (
                <div key={puppy.id} className="shrink-0 snap-center">
                  <PuppyDoorCard
                    puppy={puppy}
                    doorColor={DOOR_WOOD_COLORS[idx % DOOR_WOOD_COLORS.length]}
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
                  className="w-56 h-80 rounded-t-[100px] rounded-b-xl border-[1.5px] border-dashed border-espresso-border bg-cream-light flex flex-col items-center justify-center p-6 text-center shadow-card-soft"
                >
                  <span className="text-2xl">🐾</span>
                  <h3 className="font-display font-bold text-xl text-espresso mt-2">
                    Meet them all
                  </h3>
                  <p className="font-sans text-xs text-espresso-soft mt-1">
                    15 available puppies
                  </p>
                  <span className="mt-3 text-xs font-sans font-bold text-terracotta">
                    View catalogue →
                  </span>
                </Link>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <PoodleMascot pose="sit" className="w-16 h-14" bubbleText="tap a door! ➔" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Helper component that binds a motion value signal to PuppyDoorCard
const DesktopDoorWrapper: React.FC<{
  puppy: Puppy;
  doorColor: string;
  openMotionValue: MotionValue<boolean>;
}> = ({ puppy, doorColor, openMotionValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    return openMotionValue.on('change', (val: boolean) => {
      setIsOpen(val);
    });
  }, [openMotionValue]);

  return (
    <div className="shrink-0">
      <PuppyDoorCard puppy={puppy} doorColor={doorColor} isOpenControlled={isOpen} />
    </div>
  );
};
