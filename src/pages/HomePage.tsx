import React, { useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { HeroSection } from '../sections/home/HeroSection';
import { MeetThePupsSection } from '../sections/home/MeetThePupsSection';
import { TwoWaysSection } from '../sections/home/TwoWaysSection';
import { PuppyJourneySection } from '../sections/home/PuppyJourneySection';
import { PuppyPassportSection } from '../sections/home/PuppyPassportSection';
import { HappyFamiliesSection } from '../sections/home/HappyFamiliesSection';
import { QuestionsSection } from '../sections/home/QuestionsSection';
import { ShowroomCtaSection } from '../sections/home/ShowroomCtaSection';

/**
 * HomePage Component
 * 
 * Assembles all 8 storybook sections of TeddyPups U.A.E.:
 * 1. HeroSection: Cycling breed arches, tagline, 3D peeking mascot
 * 2. MeetThePupsSection: 3D arched wooden doors, desktop pinned horizontal track, mobile swipe carousel
 * 3. TwoWaysSection: Showroom awning vs. Korea-to-Dubai airplane flight arc
 * 4. PuppyJourneySection: 3 steps + interactive phone WhatsApp concierge
 * 5. PuppyPassportSection: Open leather puppy passport + 4 stamps + Dubai skyline
 * 6. HappyFamiliesSection: Testimonial + washi-tape Polaroids on wooden shelf
 * 7. QuestionsSection: Starry espresso FAQ preview with 3 gold sparkles
 * 8. ShowroomCtaSection: Opening storefront door + plants + "welcome home" doormat
 */
export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <SEO
        title="TeddyPups U.A.E. — Premium teacup puppies in Dubai"
        description="Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders."
        canonical="https://puppy.instabizweb.com"
      />
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Meet the Pups */}
      <MeetThePupsSection />

      {/* 3. Two Ways */}
      <TwoWaysSection />

      {/* 4. Journey */}
      <PuppyJourneySection />

      {/* 5. Puppy Passport */}
      <PuppyPassportSection />

      {/* 6. Happy Families */}
      <HappyFamiliesSection />

      {/* 7. Questions, Answered */}
      <QuestionsSection />

      {/* 8. Showroom Closing CTA */}
      <ShowroomCtaSection />
    </div>
  );
};

