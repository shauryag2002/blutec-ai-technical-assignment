import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, MapPin } from 'lucide-react';
import { StickerButton } from '../../components/ui/StickerButton';
import { CONTACT_DETAILS } from '../../data/navigation';

export const ShowroomCtaSection: React.FC = () => {
  const [isDoorOpen, setIsDoorOpen] = useState(false);

  return (
    <section id="showroom-cta" className="relative py-20 sm:py-28 bg-[#23170F] text-cream-light border-t border-cream/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none">
        
        {/* Glowing Porch Light Above Doorway */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-12 h-6 bg-honey-deep rounded-t-full border border-black/40 shadow-[0_0_35px_rgba(242,190,107,0.7)] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-honey animate-pulse" />
          </div>
          <div className="w-1 h-4 bg-espresso-border" />
        </div>

        {/* Heading */}
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-cream-light tracking-tight max-w-3xl mx-auto">
          Ready to meet your new best friend?
        </h2>
        <p className="mt-3.5 font-sans text-base sm:text-lg text-cream/80 max-w-2xl mx-auto leading-relaxed">
          Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
        </p>

        {/* Opening Storefront Doorway with 3D Swinging Door */}
        <div className="relative mt-12 max-w-xs mx-auto flex flex-col items-center">
          
          <div
            className="relative w-56 sm:w-64 h-80 sm:h-88 rounded-t-full border-[2px] border-cream/30 bg-[#2E1E14] shadow-2xl overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsDoorOpen(true)}
            onMouseLeave={() => setIsDoorOpen(false)}
            onClick={() => setIsDoorOpen(!isDoorOpen)}
            style={{ perspective: 1000 }}
          >
            {/* Inside Room with Puppy Waiting */}
            <div className="absolute inset-0 w-full h-full bg-[#EBD8C1] flex flex-col items-center justify-center p-3">
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80"
                alt="Max waiting inside"
                className="w-full h-full object-cover rounded-t-full"
              />
              <div className="absolute bottom-3 bg-cream-light border border-espresso px-3 py-1 rounded-full text-[11px] font-sans font-bold text-espresso shadow-xs">
                welcome inside! 🐾
              </div>
            </div>

            {/* 3D Swinging Door Panel */}
            <motion.div
              className="absolute inset-0 w-full h-full origin-left bg-wood rounded-t-full border-r-[2px] border-espresso-border flex flex-col items-center justify-center p-4"
              animate={{ rotateY: isDoorOpen ? -85 : 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              style={{
                transformStyle: 'preserve-3d',
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent 0,
                  transparent 34px,
                  rgba(35, 23, 15, 0.15) 35px,
                  rgba(35, 23, 15, 0.3) 36px
                )`
              }}
            >
              {/* Peephole */}
              <div className="w-8 h-8 rounded-full border border-espresso bg-honey-soft mb-8 flex items-center justify-center shadow-inner">
                <span className="text-xs">🐾</span>
              </div>

              {/* Round Doorknob */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-honey-deep border border-espresso shadow-sm" />

              <span className="font-sans font-bold text-xs text-cream-light bg-black/60 px-3 py-1 rounded-md">
                {isDoorOpen ? 'Come in!' : 'Push to open'}
              </span>
            </motion.div>
          </div>

          {/* "Welcome Home" Doormat */}
          <div className="w-48 sm:w-56 h-8 rounded-full border border-cream/30 bg-honey-deep/80 shadow-sm flex items-center justify-center -mt-2 z-10">
            <span className="font-script text-espresso font-bold text-sm tracking-wide">
              welcome home
            </span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <StickerButton
            href={CONTACT_DETAILS.whatsappUrl}
            isExternal
            variant="whatsapp"
            size="lg"
            icon={<MessageCircle className="w-4 h-4 fill-current" />}
          >
            Enquire on WhatsApp
          </StickerButton>

          <StickerButton
            to="/contact"
            variant="cream"
            size="lg"
            icon={<MapPin className="w-4 h-4 text-terracotta" />}
          >
            Visit & contact
          </StickerButton>
        </div>

      </div>
    </section>
  );
};
