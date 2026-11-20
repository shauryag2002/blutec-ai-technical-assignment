import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePawTrail } from '../../hooks/usePawTrail';

/**
 * PawTrail Component
 * 
 * Renders small, delicate, semi-transparent muted tan/brown paw steps (#9C7A5B)
 * that fade away smoothly over 700ms behind the cursor on desktop screens.
 */
export const PawTrail: React.FC = () => {
  const { paws, removePaw, isFinePointer } = usePawTrail();

  if (!isFinePointer) return null;

  return (
    <div className="paw-trail-container fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
      <AnimatePresence>
        {paws.map((paw) => (
          <motion.div
            key={paw.id}
            initial={{ opacity: 0.35, scale: 0.9 }}
            animate={{ opacity: 0, scale: 0.72 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            onAnimationComplete={() => removePaw(paw.id)}
            style={{
              position: 'fixed',
              left: paw.x,
              top: paw.y,
              transform: `translate(-50%, -50%) rotate(${paw.rotation}deg)`,
              width: 17,
              height: 17,
              color: '#9C7A5B'
            }}
          >
            {/* Soft, delicate paw print silhouette with NO harsh outline */}
            <svg
              viewBox="0 0 64 64"
              className="w-full h-full"
              fill="currentColor"
            >
              {/* Main Pad */}
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" />
              {/* Left Outer Toe */}
              <circle cx="14" cy="30" r="5" />
              {/* Center Left Toe */}
              <circle cx="25" cy="18" r="5.2" />
              {/* Center Right Toe */}
              <circle cx="39" cy="18" r="5.2" />
              {/* Right Outer Toe */}
              <circle cx="50" cy="30" r="5" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

