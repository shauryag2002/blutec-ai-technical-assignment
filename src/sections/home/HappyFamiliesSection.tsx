import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { WashiTapePolaroid } from '../../components/ui/WashiTapePolaroid';
import { StickerButton } from '../../components/ui/StickerButton';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';
import { FEATURED_TESTIMONIAL, HAPPY_FAMILIES } from '../../data/happyFamilies';

export const HappyFamiliesSection: React.FC = () => {
  return (
    <section id="happy-families" className="relative overflow-hidden">
      
      {/* UPPER BAND: Burnt-Sienna / Terracotta with Dubai Sunset Skyline Silhouette */}
      <div className="relative pt-20 pb-12 bg-terracotta text-cream-light border-b-[1.5px] border-espresso-border">
        
        {/* Layered Dubai Sunset Skyline with Burj Khalifa Spire Silhouette */}
        <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none opacity-20 overflow-hidden">
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="w-full h-full text-black fill-current">
            <path d="M0 140 V90 h40 V75 h20 V90 h30 V60 h15 V90 h20 V45 h25 V90 h40 V30 h10 V10 l4-6 v-4 l2-2 2 2 v4 l4 6 v20 h10 V90 h30 V50 h25 V90 h40 V65 h20 V90 h50 V40 h20 V90 h80 V55 h25 V90 h40 V35 h15 V90 h30 V70 h20 V90 h60 V45 h20 V90 h50 V60 h20 V90 h100 V30 h10 V10 l4-6 v-4 l2-2 2 2 v4 l4 6 v20 h10 V90 h40 V50 h25 V90 h60 V70 h20 V90 h50 V40 h20 V90 h150 V60 h20 V90 H1440 V140 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 select-none">
            <div>
              <span className="font-script text-honey text-2xl font-bold">
                64 moments and counting
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-cream-light tracking-tight mt-1">
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

          {/* Comic-Style Speech-Bubble Testimonial from Sarah M. */}
          <div className="relative bg-cream-light text-espresso p-6 sm:p-8 rounded-3xl border-[1.5px] border-espresso-border shadow-lip-md max-w-3xl mx-auto mb-10 select-none">
            {/* Speech bubble pointer arrow pointing down */}
            <div className="absolute -bottom-2.5 left-16 w-5 h-5 bg-cream-light border-b-[1.5px] border-r-[1.5px] border-espresso-border rotate-45" />

            <div className="flex items-start gap-3">
              <Quote className="w-8 h-8 text-terracotta shrink-0 mt-0.5 opacity-80" />
              <div>
                <blockquote className="font-sans font-medium text-base sm:text-lg text-espresso leading-relaxed">
                  "{FEATURED_TESTIMONIAL.quote}"
                </blockquote>
                <figcaption className="mt-3 font-script text-lg sm:text-xl text-terracotta-ink font-bold">
                  — {FEATURED_TESTIMONIAL.clientName}, {FEATURED_TESTIMONIAL.location}
                </figcaption>
              </div>
            </div>
          </div>

          {/* Wooden Shelf with Mascot Walking */}
          <div className="relative w-full h-4 bg-wood rounded-full border border-espresso/40 my-4 shadow-sm flex items-center justify-between px-6">
            <div className="absolute -top-16 right-16">
              <PoodleMascot pose="side-walk" className="w-20 h-16" bubbleText="so happy! 🧸" />
            </div>
          </div>

        </div>
      </div>

      {/* LOWER GALLERY: Dark Brown Wooden Plank Wall (#3B241A) with Polaroids, Floor Lamp & Arched Door */}
      <div
        className="relative py-16 sm:py-24 bg-[#3B241A] text-cream-light border-b-[1.5px] border-espresso-border"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent 0,
            transparent 38px,
            rgba(0, 0, 0, 0.2) 39px,
            rgba(0, 0, 0, 0.35) 40px
          )`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex items-center justify-between gap-6">
            
            {/* Illustrated Floor Lamp on Left */}
            <div className="hidden xl:flex flex-col items-center shrink-0 -mt-12 select-none">
              {/* Glowing Lamp Shade */}
              <div className="w-16 h-12 bg-honey-soft rounded-t-full border border-espresso shadow-[0_0_25px_rgba(242,190,107,0.5)] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-honey" />
              </div>
              {/* Lamp Pole */}
              <div className="w-1.5 h-64 bg-honey-deep border-x border-espresso/50" />
              {/* Lamp Base */}
              <div className="w-16 h-3 bg-wood rounded-full border border-espresso" />
            </div>

            {/* Polaroid Gallery Grid (2 Rows of Polaroids) */}
            <div className="flex-1">
              {/* Row 1 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 justify-items-center mb-6">
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

              {/* Row 2 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 justify-items-center">
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

            {/* Cozy Arched Wooden Door on Right */}
            <div className="hidden xl:flex flex-col items-center shrink-0 select-none">
              <div className="w-20 h-44 rounded-t-full border-2 border-espresso bg-wood relative shadow-lg overflow-hidden">
                <div className="absolute top-1/2 right-2 w-2 h-2 rounded-full bg-honey border border-espresso" />
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
