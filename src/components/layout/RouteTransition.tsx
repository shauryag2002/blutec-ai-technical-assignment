import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PoodleMascot } from '../mascot/PoodleMascot';

interface RouteTransitionProps {
  isTransitioning: boolean;
}

/**
 * RouteTransition Component
 * 
 * Full-screen diamond-grid scalloped curtain with walking poodle
 * and animated paw trail above "every puppy is family".
 * Displays during initial site load and page transitions.
 */
export const RouteTransition: React.FC<RouteTransitionProps> = ({ isTransitioning }) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] pointer-events-none flex flex-col justify-between overflow-hidden"
        >
          {/* Top Scalloped Edge Border */}
          <div className="w-full h-10 bg-honey-soft border-b-2 border-espresso overflow-hidden">
            <svg width="100%" height="40" preserveAspectRatio="none">
              <defs>
                <pattern id="curtain-scallop-top" width="76" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40 V27 A38 25 0 0 1 76 27 V40 Z" fill="#FBE3B4" />
                  <path d="M0 27 A38 25 0 0 1 76 27" fill="none" stroke="#2A1A14" strokeWidth="3" />
                  <path d="M11 33 A27 19 0 0 1 65 33" fill="none" stroke="#2A1A14" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity="0.45" />
                </pattern>
              </defs>
              <rect width="100%" height="40" fill="url(#curtain-scallop-top)" />
            </svg>
          </div>

          {/* Center Stage: Diamond Grid Blanket with Walking Poodle & Paw Prints */}
          <div className="flex-1 bg-[#FDF6EC] bg-diamond-grid flex flex-col items-center justify-center p-6 text-center">
            <div className="relative max-w-md w-full flex flex-col items-center">

              {/* Walking Poodle Mascot */}
              <motion.div
                initial={{ x: -140, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', damping: 15 }}
                className="mb-4"
              >
                <PoodleMascot pose="walk" className="w-28 h-24" />
              </motion.div>

              {/* Paw Prints Trail */}
              <div className="flex items-center justify-center gap-3 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 0.85, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.2 }}
                  >
                    <svg
                      viewBox="0 0 64 64"
                      className="w-5 h-5 text-terracotta transform rotate-12"
                      fill="currentColor"
                    >
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71Z" />
                    </svg>
                  </motion.div>
                ))}
              </div>

              {/* Storybook Script Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="font-script text-2xl sm:text-3xl font-bold text-terracotta-ink tracking-wide"
              >
                every puppy is family
              </motion.p>
            </div>
          </div>

          {/* Bottom Scalloped Edge Border */}
          <div className="w-full h-10 bg-honey-soft border-t-2 border-espresso overflow-hidden rotate-180">
            <svg width="100%" height="40" preserveAspectRatio="none">
              <rect width="100%" height="40" fill="url(#curtain-scallop-top)" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

