import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PushpinNoteCardProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  tiltDeg?: number;
  pinColor?: string;
  isSparkle?: boolean;
}

/**
 * PushpinNoteCard Component
 * 
 * Styled as a paper note pinned to a corkboard.
 * When clicked, the note straightens to 0deg and expands the answer.
 */
export const PushpinNoteCard: React.FC<PushpinNoteCardProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  tiltDeg = -1.5,
  pinColor = '#B8502D',
  isSparkle = false
}) => {
  return (
    <motion.div
      layout
      animate={{
        rotate: isOpen ? 0 : tiltDeg,
        scale: isOpen ? 1.02 : 1
      }}
      transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      onClick={onToggle}
      className={`pushpin-card relative bg-[#FFFDF8] border-2 border-espresso rounded-xl p-5 sm:p-6 shadow-hard-md hover:shadow-hard-lg transition-shadow cursor-pointer select-none ${isOpen ? 'ring-2 ring-honey' : ''
        }`}
    >
      {/* 3D Pushpin at Top */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <div
          className="w-5 h-5 rounded-full border-2 border-espresso shadow-hard-sm"
          style={{ backgroundColor: pinColor }}
        >
          {/* Pushpin metallic highlight */}
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full m-0.5" />
        </div>
      </div>

      {/* Header Question */}
      <div className="pt-2 flex items-start justify-between gap-3">
        <h4 className="font-display font-bold text-base sm:text-lg text-espresso leading-snug flex items-center gap-2">
          {isSparkle && <span className="text-honey-deep text-sm">✦</span>}
          <span>{question}</span>
        </h4>
        <span className="text-xl font-display font-bold text-espresso/60 shrink-0">
          {isOpen ? '−' : '+'}
        </span>
      </div>

      {/* Expandable Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-3 border-t-2 border-dashed border-espresso/20 text-sm sm:text-base text-espresso/85 font-sans leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

