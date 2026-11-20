import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, MapPin } from 'lucide-react';
import { StickerButton } from '../../components/ui/StickerButton';
import { CONTACT_DETAILS } from '../../data/navigation';

/**
 * ShowroomCtaSection Component
 * 
 * Features:
 * - Headline: "Ready to meet your new best friend?"
 * - Interactive storefront door that swings open on hover/tap revealing puppy inside
 * - Potted plants on sides, welcoming wall lamp, and "welcome home" doormat
 * - Action buttons: Enquire on WhatsApp & Visit & contact
 */
export const ShowroomCtaSection: React.FC = () => {
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  return (
    <section className="relative py-20 sm:py-28 bg-[#FDF6EC] border-b-4 border-espresso overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none">
        
        {/* Heading & Lede */}
        <span className="font-script text-terracotta text-2xl font-bold">
          visit us in Downtown Dubai
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-espresso tracking-tight mt-1 max-w-3xl mx-auto">
          Ready to meet your new best friend?
        </h2>
        <p className="mt-4 font-sans text-base sm:text-lg text-espresso/80 max-w-2xl mx-auto leading-relaxed">
          Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
        </p>

        {/* Opening Storefront Doorway Illustration */}
        <div className="relative mt-12 sm:mt-16 max-w-md mx-auto flex flex-col items-center">
          
          <div className="relative flex items-end justify-center">
            
            {/* Left Potted Plant */}
            <div className="hidden sm:flex flex-col items-center mr-6 mb-4">
              <span className="text-4xl">🪴</span>
            </div>

            {/* Storefront Doorway with 3D Door */}
            <div
              className="relative w-56 sm:w-64 h-80 sm:h-88 rounded-t-full border-[3px] border-espresso bg-honey-soft shadow-hard-lg overflow-hidden cursor-pointer"
              onMouseEnter={() => setIsDoorOpen(true)}
              onMouseLeave={() => setIsDoorOpen(false)}
              onClick={() => setIsDoorOpen(!isDoorOpen)}
              style={{ perspective: 1000 }}
            >
              {/* Inside Store Room with Puppy Waiting */}
              <div className="absolute inset-0 w-full h-full bg-[#EBD8C1] flex flex-col items-center justify-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80"
                  alt="Max waiting inside"
                  className="w-full h-full object-cover rounded-t-full"
                />
                <div className="absolute bottom-3 bg-cream-light border border-espresso px-3 py-1 rounded-full text-[11px] font-display font-bold text-espresso shadow-xs">
                  Max says hello! 🐾
                </div>
              </div>

              {/* 3D Swinging Door Panel */}
              <motion.div
                className="absolute inset-0 w-full h-full origin-left bg-wood rounded-t-full border-r-[3px] border-espresso flex flex-col items-center justify-center p-4"
                animate={{ rotateY: isDoorOpen ? -80 : 0 }}
                transition={{ type: 'spring', damping: 18, stiffness: 140 }}
                style={{
                  transformStyle: 'preserve-3d',
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent 0,
                    transparent 36px,
                    rgba(42, 26, 20, 0.2) 37px,
                    rgba(42, 26, 20, 0.35) 38px
                  )`
                }}
              >
                {/* Peephole */}
                <div className="w-9 h-9 rounded-full border-2 border-espresso bg-honey-soft mb-8 flex items-center justify-center shadow-inner">
                  <span className="text-xs">🐾</span>
                </div>

                {/* Door Handle */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-honey-deep border-2 border-espresso shadow-hard-sm" />

                <span className="font-display font-bold text-xs text-cream-light bg-espresso/80 px-2.5 py-1 rounded-md">
                  {isDoorOpen ? 'Open!' : 'Push to open'}
                </span>
              </motion.div>
            </div>

            {/* Right Potted Plant */}
            <div className="hidden sm:flex flex-col items-center ml-6 mb-4">
              <span className="text-4xl">🪴</span>
            </div>

          </div>

          {/* "Welcome Home" Doormat */}
          <div className="w-48 sm:w-56 h-8 rounded-full border-2 border-espresso bg-honey-deep/80 shadow-hard-sm flex items-center justify-center -mt-2 z-10">
            <span className="font-script text-espresso font-bold text-sm tracking-wide">
              welcome home
            </span>
          </div>

        </div>

        {/* Closing Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <StickerButton
            href={CONTACT_DETAILS.whatsappUrl}
            isExternal
            variant="whatsapp"
            size="lg"
            icon={<MessageCircle className="w-5 h-5 fill-current" />}
          >
            Enquire on WhatsApp
          </StickerButton>

          <StickerButton
            to="/contact"
            variant="cream"
            size="lg"
            icon={<MapPin className="w-5 h-5 text-terracotta" />}
          >
            Visit & contact
          </StickerButton>
        </div>

      </div>
    </section>
  );
};

