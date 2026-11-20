import React, { useEffect } from 'react';
import { WashiTapePolaroid } from '../components/ui/WashiTapePolaroid';
import { HAPPY_FAMILIES, FEATURED_TESTIMONIAL } from '../data/happyFamilies';
import { Quote } from 'lucide-react';

export const HappyFamiliesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 select-none">
          <span className="font-script text-terracotta text-2xl font-bold">
            64 moments and counting
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-espresso tracking-tight mt-1">
            Happy families
          </h1>
          <p className="mt-3 font-sans text-base sm:text-lg text-espresso/80">
            Real families, heartwarming cuddles, and lifetime bonds formed across the UAE.
          </p>
        </div>

        {/* Featured Testimonial Quote */}
        <div className="bg-cream-light border-2 border-espresso rounded-3xl p-6 sm:p-8 shadow-hard-md max-w-4xl mx-auto mb-14">
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
        </div>

        {/* Polaroid Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {HAPPY_FAMILIES.map((moment) => (
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
  );
};

