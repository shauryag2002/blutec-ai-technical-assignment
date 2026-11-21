import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { PuppyDoorCard } from '../../components/ui/PuppyDoorCard';
import { PUPPIES } from '../../data/puppies';
import type { Puppy } from '../../types/puppy';
import { useResponsive } from '../../hooks/useMediaQuery';

// Exact wood tones from reference site https://puppy.instabizweb.com
const DOOR_WOOD_COLORS = [
  '#a24a1a', // Max (Maltipoo)
  '#5a3a28', // Korean Teacup Maltipoo
  '#d4893f', // Korean Teacup Poodle
  '#b8644a', // Maltipoo & Cavapoo
  '#7a4a2e', // Toy Poodle
  '#a24a1a', // Maltipoo
  '#5a3a28'  // Pomeranian
];

export const MeetThePupsSection: React.FC = () => {
  const { isDesktop } = useResponsive();
  const targetRef = useRef<HTMLDivElement>(null);
  const featuredPuppies = PUPPIES.slice(0, 7);

  // Controlled open door state for mobile tap

  // Scroll progress for desktop sticky horizontal treadmill walk
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  // Track and floor background transforms
  const trackX = useTransform(scrollYProgress, [0, 1], ['0px', '-1750px']);
  const floorXStr = useTransform(scrollYProgress, [0, 1], ['0px', '-1750px']);

  // Doors swing open as they pass Teddy's viewpoint at 14vw
  const door1Open = useTransform(scrollYProgress, [0.03, 0.18], [false, true]);
  const door2Open = useTransform(scrollYProgress, [0.15, 0.32], [false, true]);
  const door3Open = useTransform(scrollYProgress, [0.28, 0.46], [false, true]);
  const door4Open = useTransform(scrollYProgress, [0.42, 0.60], [false, true]);
  const door5Open = useTransform(scrollYProgress, [0.55, 0.74], [false, true]);
  const door6Open = useTransform(scrollYProgress, [0.68, 0.86], [false, true]);
  const door7Open = useTransform(scrollYProgress, [0.78, 0.96], [false, true]);
  const doorOpenSignals = [door1Open, door2Open, door3Open, door4Open, door5Open, door6Open, door7Open];

  return (
    <div data-section="meet">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-meet"
        style={{
          '--sky-top': '#fff1d8',
          '--sky-bottom': '#fbe3b4'
        } as React.CSSProperties}
        aria-labelledby="meet-title"
        data-pinned={isDesktop ? 'true' : undefined}
      >
        <div
          ref={targetRef}
          data-pin-range="true"
          className={isDesktop ? 'relative h-[280vh]' : 'py-16'}
        >
          <div className="tp-meet__stage">
            {/* Header: Title, Description & CTA Button */}
            <header className="tp-meet__head gutter">
              <div>
                <h2 id="meet-title" className="font-plush text-4xl sm:text-5xl lg:text-8xl text-espresso tracking-tight">
                  Meet the pups
                </h2>
                <p className="mt-3 font-sans text-base sm:text-lg text-espresso-soft max-w-[44ch] leading-relaxed">
                  Real puppies, real photos, looking for their families right now.
                </p>
              </div>

              <Link to="/puppies" className="btn btn-primary px-7 py-3 text-base font-semibold shrink-0">
                See all available puppies
              </Link>
            </header>

            {/* DESKTOP TREADMILL HALL */}
            {isDesktop ? (
              <div
                className="tp-meet__hall"
                style={{
                  '--door-w': '244px'
                } as React.CSSProperties}
              >
                {/* Horizontal Treadmill Track of Doors */}
                <motion.ol
                  style={{ x: trackX }}
                  className="tp-meet__track"
                  data-treadmill="true"
                  aria-label="Puppies looking for a family"
                >
                  {featuredPuppies.map((puppy, idx) => (
                    <DesktopDoorWrapper
                      key={puppy.id}
                      puppy={puppy}
                      doorColor={DOOR_WOOD_COLORS[idx % DOOR_WOOD_COLORS.length]}
                      openMotionValue={doorOpenSignals[idx]}
                    />
                  ))}

                  {/* End Card: Dashed Arched Door Frame "Meet them all" */}
                  <li className="tp-door tp-door--all" data-open="true">
                    <Link to="/puppies" className="tp-door__link block group">
                      <span className="tp-door__frame tp-door__frame--all transition-colors group-hover:border-terracotta">
                        <span className="font-plush tp-door__all">
                          Meet<br />them all
                        </span>
                      </span>
                    </Link>
                  </li>
                </motion.ol>

                {/* Wooden Floor Baseline */}
                <motion.div
                  aria-hidden="true"
                  className="tp-meet__floor"
                  style={{
                    '--floor-x': floorXStr
                  } as unknown as React.CSSProperties}
                />

                {/* Stationary Mascot Anchor at left: 14vw */}
                <div
                  id="pup-stop-meet"
                  data-pup-stop="true"
                  data-pose="walk"
                  data-facing="right"
                  className="pup-stop tp-meet__teddy"
                  data-act="treadmill"
                />
              </div>
            ) : (
              /* MOBILE RESPONSIVE GRID MATCHING LIVE SITE */
              <div className="tp-meet__hall mt-6">
                <ol className="tp-meet__track" data-treadmill="true" aria-label="Puppies looking for a family">
                  {featuredPuppies.map((puppy, idx) => (
                    <PuppyDoorCard
                      key={puppy.id}
                      puppy={puppy}
                      doorColor={DOOR_WOOD_COLORS[idx % DOOR_WOOD_COLORS.length]}
                      isOpenControlled={true}
                    />
                  ))}

                  <li className="tp-door tp-door--all" data-open="true">
                    <Link to="/puppies" className="tp-door__link block group">
                      <span className="tp-door__frame tp-door__frame--all">
                        <span className="font-plush tp-door__all">
                          Meet<br />them all
                        </span>
                      </span>
                    </Link>
                  </li>
                </ol>
                <div
                  id="pup-stop-meet"
                  data-pup-stop="true"
                  data-pose="walk"
                  data-facing="right"
                  className="pup-stop tp-meet__teddy hidden"
                  data-act="treadmill"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

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
    <PuppyDoorCard puppy={puppy} doorColor={doorColor} isOpenControlled={isOpen} />
  );
};
