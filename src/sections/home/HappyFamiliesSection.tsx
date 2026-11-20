import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import { WashiTapePolaroid } from '../../components/ui/WashiTapePolaroid';
import { StickerButton } from '../../components/ui/StickerButton';
import { FEATURED_TESTIMONIAL, HAPPY_FAMILIES } from '../../data/happyFamilies';

/**
 * HappyFamiliesSection Component
 * 
 * Features:
 * - Rich burnt-sienna (#B8502D) cozy backdrop
 * - Featured speech-bubble testimonial from Sarah M., Dubai
 * - Dark brown wooden display shelf
 * - 2 rows of tilted Polaroids taped with pastel washi tape
 * - Cozy streetlamp illustration & "See every happy family" CTA
 */
export const HappyFamiliesSection: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-28 bg-terracotta text-cream-light border-b-2 border-espresso overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-honey/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 select-none">
          <div>
            <span className="font-script text-honey text-2xl font-bold">
              64 moments and counting
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-cream-light tracking-tight mt-1">
              Happy families & puppies
            </h2>
            <p className="mt-2 font-sans text-base sm:text-lg text-cream/80 max-w-xl">
              Heartwarming moments shared by our valued clients across Dubai and the Emirates.
            </p>
          </div>

          <StickerButton
            to="/happy-families"
            variant="cream"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            See every happy family
          </StickerButton>
        </div>

        {/* Featured Testimonial Speech Bubble */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative bg-cream-light text-espresso p-6 sm:p-8 rounded-3xl border-2 border-espresso shadow-hard-lg mb-14 max-w-4xl mx-auto select-none"
        >
          {/* Speech bubble pointer arrow */}
          <div className="absolute -bottom-3 left-12 w-6 h-6 bg-cream-light border-b-2 border-r-2 border-espresso rotate-45" />

          <div className="flex items-start gap-4">
            <Quote className="w-10 h-10 text-terracotta shrink-0 mt-1 opacity-70" />
            <div>
              <blockquote className="font-display font-bold text-lg sm:text-xl text-espresso leading-relaxed">
                "{FEATURED_TESTIMONIAL.quote}"
              </blockquote>
              <figcaption className="mt-4 font-script text-lg sm:text-xl text-terracotta-ink font-bold">
                — {FEATURED_TESTIMONIAL.clientName}, {FEATURED_TESTIMONIAL.location}
              </figcaption>
            </div>
          </div>
        </motion.div>

        {/* Polaroid Shelf / Wall */}
        <div className="mt-8">
          {/* Top Row of Polaroids */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center mb-8">
            {HAPPY_FAMILIES.slice(0, 4).map((moment) => (
              <WashiTapePolaroid
                key={moment.id}
                image={moment.image}
                caption={moment.caption}
                clientName={moment.clientName}
                location={moment.location}
                washiColor={moment.washiColor}
                tiltDeg={moment.tiltDeg}
              />
            ))}
          </div>

          {/* Wooden Shelf Divider */}
          <div className="w-full h-4 bg-wood rounded-full border-2 border-espresso shadow-hard-sm my-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/15" />
          </div>

          {/* Bottom Row of Polaroids */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
            {HAPPY_FAMILIES.slice(4, 8).map((moment) => (
              <WashiTapePolaroid
                key={moment.id}
                image={moment.image}
                caption={moment.caption}
                clientName={moment.clientName}
                location={moment.location}
                washiColor={moment.washiColor}
                tiltDeg={moment.tiltDeg}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

