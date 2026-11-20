import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { PuppyDoorCard } from '../../components/ui/PuppyDoorCard';
import { StickerButton } from '../../components/ui/StickerButton';
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
  const trackX = useTransform(scrollYProgress, [0, 1], ['0%', '-98%']);
  const poodleWalkLeft = useTransform(scrollYProgress, [0, 1], ['18%', '82%']);

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
      className={`relative bg-[#FFF1D8] border-b-[1.5px] border-espresso-border ${isDesktop ? 'h-[260vh]' : 'py-16'
        }`}
    >
      <div
        className={`${isDesktop ? 'sticky top-20 h-[calc(100vh-5rem)] overflow-hidden flex flex-col justify-between pt-8' : ''
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
          <div className="relative flex-1 flex flex-col justify-end overflow-hidden">
            {/* Horizontal Track of Puppy Doors */}
            <motion.div
              style={{ x: trackX }}
              className="flex items-end gap-8 pl-[32vw] lg:pl-[35vw] pr-28 pb-0 z-10"
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
              <li className="tp-door tp-door--all shrink-0 list-none flex flex-col items-center">
                <Link
                  to="/puppies"
                  className="tp-door__link block w-52 sm:w-60 group cursor-pointer"
                >
                  <span className="tp-door__frame tp-door__frame--all relative aspect-[4/5.2] w-full rounded-t-full border-[3px] border-b-0 border-dashed border-[#2a170e] bg-transparent flex items-center justify-center p-4 transition-colors group-hover:border-terracotta">
                    <span className="font-display font-extrabold text-3xl sm:text-4xl text-espresso text-center leading-tight">
                      <span className="underline decoration-terracotta decoration-[3px] underline-offset-4">Meet</span>
                      <br />
                      <span className="underline decoration-terracotta decoration-[3px] underline-offset-8">them all</span>
                    </span>
                  </span>
                </Link>
              </li>
            </motion.div>

            {/* Authentic Wooden Plank Footpath along the bottom */}
            <div
              className="tp-meet__floor relative w-full h-24 sm:h-28 border-t-[3px] border-[#2a170e] z-10"
              style={{
                background: `
                  linear-gradient(to bottom, rgba(42, 23, 14, 0.16), transparent 22%),
                  repeating-linear-gradient(90deg, transparent 0 calc(11rem - 2px), rgba(42, 23, 14, 0.12) calc(11rem - 2px) 11rem),
                  linear-gradient(#e8b06a, #dc9a52)
                `,
                boxShadow: 'rgb(245, 217, 168) 0px -12px 0px -6px'
              }}
            >
              {/* Moving Stop Anchor for the Global Walking Mascot */}
              <motion.div
                id="pup-stop-meet"
                style={{ left: poodleWalkLeft }}
                className="absolute -top-16 w-28 h-24 pointer-events-none"
              />
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
                  className="w-52 aspect-[4/5.2] rounded-t-full border-[3px] border-b-0 border-dashed border-[#2a170e] bg-transparent flex items-center justify-center p-4 transition-colors group"
                >
                  <span className="font-display font-extrabold text-3xl text-espresso text-center leading-tight">
                    <span className="underline decoration-terracotta decoration-[3px] underline-offset-4">Meet</span>
                    <br />
                    <span className="underline decoration-terracotta decoration-[3px] underline-offset-8">them all</span>
                  </span>
                </Link>
              </div>
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
