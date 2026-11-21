import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useEyeTracking } from '../../hooks/useEyeTracking';

export type PoodlePose = 
  | 'hero-peek'
  | 'side-walk'
  | 'signpost-peek'
  | 'journey-step'
  | 'passport-stand'
  | 'shelf-walk'
  | 'footer-walk'
  | 'sit'
  | 'peek'
  | 'walk'
  | 'think'
  | 'basket'
  | 'snug'
  | 'bow';

interface PoodleMascotProps {
  pose?: PoodlePose;
  className?: string;
  bubbleText?: string;
  flipProgress?: number;
  facing?: 'left' | 'right';
}

/**
 * PoodleMascot Component (Teddy)
 * 
 * Exact vector illustration of Teddy, the TeddyPups mascot from https://puppy.instabizweb.com/.
 * Features:
 * - Caramel/golden fur (#f2be6b, #e4a352) with espresso outline (#2a170e)
 * - Layered cloud curl head puff, ears, and cream muzzle patch (#fbe3b4)
 * - Soft rosy cheeks (#f9b9a6) and rust collar with heart tag (#a24a1a)
 * - Interactive mouse eye-tracking with spring physics
 * - Hover tail wiggle on the pom-pom tail
 * - Dynamic pose switching: 'peek', 'walk', 'sit', 'bow', 'snug' / 'basket'
 */
export const PoodleMascot: React.FC<PoodleMascotProps> = ({
  pose = 'sit',
  className = 'w-36 h-32',
  bubbleText,
  flipProgress,
  facing = 'right'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic eye tracking for pupils and specular highlights
  const { highlightX, highlightY, pupilX, pupilY } = useEyeTracking(containerRef);

  // Normalize pose mappings
  const isPeeking = pose === 'peek' || pose === 'hero-peek' || pose === 'signpost-peek';
  const isSitting = pose === 'sit' || pose === 'passport-stand' || pose === 'think';
  const isBowing = pose === 'bow';
  const isBasket = pose === 'basket' || pose === 'snug';
  const isWalking = !isPeeking && !isSitting && !isBowing && !isBasket;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer ${className}`}
    >
      {/* Speech Bubble */}
      {bubbleText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute -top-11 left-1/2 -translate-x-1/2 bg-cream-light border-[1.5px] border-espresso-border px-3.5 py-1 rounded-full shadow-lip-sm text-xs font-scrawl font-bold text-espresso whitespace-nowrap z-30 pointer-events-none"
        >
          {bubbleText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cream-light border-b-[1.5px] border-r-[1.5px] border-espresso-border rotate-45" />
        </motion.div>
      )}

      {/* Main Mascot Motion Container */}
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={
          isPeeking
            ? { y: [0, -4, 0] }
            : isWalking
            ? { y: [0, -3, 0] }
            : {}
        }
        transition={{
          repeat: Infinity,
          duration: isPeeking ? 3.5 : 0.7,
          ease: 'easeInOut'
        }}
        style={{
          transform: flipProgress !== undefined ? `rotateY(${flipProgress * 360}deg)` : undefined
        }}
      >
        <svg
          viewBox="0 0 300 240"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label="Teddy, the TeddyPups puppy"
          focusable="false"
        >
          <g data-p="root" transform={facing === 'left' ? 'translate(300 0) scale(-1 1)' : undefined}>
            {/* Ground Shadow (when standing or sitting) */}
            <ellipse
              data-p="shadow"
              cx="150"
              cy="230"
              rx="92"
              ry="7"
              fill="#2a170e"
              opacity={isPeeking || isBasket ? 0 : 0.12}
            />

            {/* Walking / Standing Body & Stepping Legs */}
            <g
              data-p="body"
              opacity={isPeeking || isBasket ? 0 : 1}
              transform={
                isSitting
                  ? 'translate(0 -2) rotate(-24 196 206)'
                  : isBowing
                  ? 'translate(0 2) rotate(15 196 206)'
                  : undefined
              }
            >
              {/* Back foot (far) */}
              <g
                transform="translate(94, 192)"
                opacity={isSitting ? 0 : 1}
              >
                <motion.g
                  data-p="bf"
                  animate={isWalking ? { rotate: [-22, 22, -22] } : { rotate: 0 }}
                  transition={{ repeat: Infinity, duration: 0.65, ease: 'easeInOut' }}
                >
                  <path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z" fill="#e4a352" />
                  <path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                  <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                </motion.g>
              </g>

              {/* Front foot (far) */}
              <g transform="translate(168, 192)">
                <motion.g
                  data-p="ff"
                  animate={isWalking ? { rotate: [22, -22, 22] } : { rotate: isSitting ? 24 : isBowing ? -67 : 0 }}
                  transition={isWalking ? { repeat: Infinity, duration: 0.65, ease: 'easeInOut' } : { duration: 0.3 }}
                >
                  <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z" fill="#e4a352" />
                  <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                  <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                </motion.g>
              </g>

              {/* Fluffy Pom-Pom Tail */}
              <g transform="translate(84, 150)">
                <motion.g
                  data-p="tail"
                  animate={
                    isHovered
                      ? { rotate: [-28, 14, -28] }
                      : isSitting
                      ? { rotate: [28, 36, 28] }
                      : isBowing
                      ? { rotate: [-36, -28, -36] }
                      : { rotate: [-5, 5, -5] }
                  }
                  transition={{ repeat: Infinity, duration: isHovered ? 0.35 : 1.2, ease: 'easeInOut' }}
                >
                  <path d="M2 2 C-4 -4 -8 -10 -10 -14" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                  <path d="M2 2 C-4 -4 -8 -10 -10 -14" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <g transform="translate(-84, -150)">
                    <path d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                  </g>
                </motion.g>
              </g>

              {/* Back near leg */}
              <g
                transform="translate(110, 194)"
                opacity={isSitting ? 0 : 1}
              >
                <motion.g
                  data-p="bn"
                  animate={isWalking ? { rotate: [22, -22, 22] } : { rotate: 0 }}
                  transition={{ repeat: Infinity, duration: 0.65, ease: 'easeInOut' }}
                >
                  <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z" fill="#f2be6b" />
                  <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                  <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                </motion.g>
              </g>

              {/* Main Cloud Fluffy Torso */}
              <path d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />

              {/* Front near leg */}
              <g transform="translate(186, 194)">
                <motion.g
                  data-p="fn"
                  animate={isWalking ? { rotate: [-22, 22, -22] } : { rotate: isSitting ? 24 : isBowing ? -73 : 0 }}
                  transition={isWalking ? { repeat: Infinity, duration: 0.65, ease: 'easeInOut' } : { duration: 0.3 }}
                >
                  <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z" fill="#f2be6b" />
                  <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                  <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                </motion.g>
              </g>
            </g>

            {/* Sitting Haunch (sitting pose) */}
            <g data-p="haunch" opacity={isSitting && !isBasket ? 1 : 0}>
              <path d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M132 222v5M139 222v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </g>

            {/* Head & Facial Features */}
            <g
              data-p="head"
              transform={
                isPeeking
                  ? 'translate(0 4) rotate(0 212 100)'
                  : isBowing
                  ? 'translate(14, 30)'
                  : isBasket
                  ? 'translate(0 9) rotate(4 212 100)'
                  : 'translate(0, 4)'
              }
            >
              {/* Rust Collar with Small Cream Heart Tag */}
              <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />

              {/* Scalloped Fluffy Ears Framing Both Sides */}
              <path data-p="earL" d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" transform={isBasket ? 'rotate(3 174 82)' : 'rotate(-6 174 82)'} />
              <path data-p="earR" d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" transform={isBasket ? 'rotate(-3 250 82)' : 'rotate(6 250 82)'} />

              {/* Main Cloud Fluffy Head Puff */}
              <path d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
              {/* Top Curl Puff */}
              <path d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />

              {/* Cream Muzzle Patch */}
              <path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill="#fbe3b4" />
              {/* Soft Pink Rosy Cheeks */}
              <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
              <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />

              {/* Dark Rounded Eyes (or happy closed eyes in bow mode) */}
              <g data-p="eyes" opacity={isBowing ? 0 : 1}>
                <motion.ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" style={{ x: pupilX, y: pupilY }} />
                <motion.ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" style={{ x: pupilX, y: pupilY }} />
                {/* Specular highlights that follow mouse cursor */}
                <motion.circle cx="196.6" cy="94.6" r="2.7" fill="#fff" style={{ x: highlightX, y: highlightY }} />
                <motion.circle cx="232.6" cy="94.6" r="2.7" fill="#fff" style={{ x: highlightX, y: highlightY }} />
                <motion.circle cx="192" cy="101.2" r="1.2" fill="#fff" style={{ x: highlightX, y: highlightY }} />
                <motion.circle cx="228" cy="101.2" r="1.2" fill="#fff" style={{ x: highlightX, y: highlightY }} />
              </g>

              {/* Happy squint eyes when bowing */}
              <path
                data-p="happy"
                d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                opacity={isBowing ? 1 : 0}
              />

              {/* Rounded Dark Nose, Friendly Smile & Tongue */}
              <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" />
              <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path data-p="tongue" d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" opacity={isBasket ? 0 : 1} />
            </g>

            {/* Front Paws Resting on Ledge / Quilt / Basket rim */}
            <g
              data-p="ledge"
              opacity={isPeeking || isBasket ? 1 : 0}
            >
              <path d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
