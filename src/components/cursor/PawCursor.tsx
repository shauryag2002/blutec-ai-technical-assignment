import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomCursor } from '../../hooks/useCustomCursor';

/**
 * PawCursor Component
 * 
 * Renders a playful custom brown paw-print cursor on desktop screens (fine pointer).
 * Transitions gracefully when hovering over interactive elements with scale and tilt.
 */
export const PawCursor: React.FC = () => {
  const { isFinePointer, isVisible, isHovered, isPressed, x, y } = useCustomCursor();

  if (!isFinePointer) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="paw-cursor-overlay fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x,
            y,
            translateX: '-30%',
            translateY: '-30%'
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: isPressed ? 0.9 : isHovered ? 1.15 : 1,
            rotate: isHovered ? -8 : 0
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            scale: { type: 'spring', damping: 20, stiffness: 400 },
            rotate: { type: 'spring', damping: 15, stiffness: 300 }
          }}
        >
          {/* Custom Paw Print SVG */}
          <div className="relative">
            <svg
              viewBox="0 0 64 64"
              className={`w-9 h-9 transition-colors duration-200 drop-shadow-[2px_2px_0px_#2A1A14] ${
                isHovered ? 'text-terracotta' : 'text-[#8B4513]'
              }`}
              fill="currentColor"
              stroke="#2A1A14"
              strokeWidth="2.5"
              strokeLinejoin="round"
            >
              {/* Main Paw Pad */}
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" />
              {/* Left Outer Toe */}
              <path d="M19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71Z" />
              {/* Center Left Toe */}
              <path d="M29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64Z" />
              {/* Center Right Toe */}
              <path d="M45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56Z" />
              {/* Right Outer Toe */}
              <path d="M54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>

            {/* Sparkle micro-indicator on hover */}
            {isHovered && (
              <motion.span
                className="absolute -top-1 -right-1 text-honey text-xs font-bold leading-none"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.2 }}
              >
                ✦
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

