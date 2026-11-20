import React from 'react';
import { ShieldCheck, Plane, HeartHandshake, Globe } from 'lucide-react';
import { PassportStamp } from '../../components/ui/PassportStamp';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';

const STAMPS_DATA = [
  {
    title: 'Vet-checked & healthy',
    description: 'Vaccinated, dewormed, and vet certified.',
    icon: <ShieldCheck className="w-6 h-6 text-emerald" />,
    color: '#1E7F4F',
    tiltDeg: -3
  },
  {
    title: 'Korea to Dubai, safely',
    description: 'Trusted breeders and safe flight care.',
    icon: <Plane className="w-6 h-6 text-sky-deep" />,
    color: '#2F6E9E',
    tiltDeg: 3.5
  },
  {
    title: 'Support 24/7',
    description: 'Guidance from arrival to forever home.',
    icon: <HeartHandshake className="w-6 h-6 text-terracotta" />,
    color: '#B8502D',
    tiltDeg: -2.5
  },
  {
    title: 'Trusted worldwide',
    description: 'Healthy puppies delivered globally.',
    icon: <Globe className="w-6 h-6 text-honey-deep" />,
    color: '#C27E3E',
    tiltDeg: 2
  }
];

/**
 * PuppyPassportSection Component
 * 
 * Upgrades:
 * - Section background set to warm golden-tan (#E7C592)
 * - Open 2-page leather booklet spread with scalloped inner edges:
 *   - Left Page: Clean heading + subtitle + upright standing PoodleMascot with generous breathing room (zero overlap)
 *   - Right Page: The 4 passport ink stamps arranged in a 2x2 grid
 */
export const PuppyPassportSection: React.FC = () => {
  return (
    <section id="puppy-passport" className="relative py-20 sm:py-28 bg-[#E7C592] border-b-[1.5px] border-espresso-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
        
        {/* OPEN 2-PAGE LEATHER-BOUND PUPPY PASSPORT BOOKLET */}
        <div className="relative rounded-3xl border-[2px] border-espresso-border bg-[#FBF4E8] shadow-xl overflow-hidden p-6 sm:p-10">
          
          {/* Leather Book Spine Crease down the Center */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-espresso/5 via-espresso/15 to-espresso/5 pointer-events-none z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            {/* LEFT PAGE: Heading, Subtitle & Upright Standing Mascot */}
            <div className="flex flex-col justify-between h-full pr-0 lg:pr-6">
              <div>
                <span className="font-script text-terracotta text-2xl font-bold">
                  puppy passport
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-espresso tracking-tight mt-1">
                  Why families trust TeddyPups
                </h2>
                <p className="mt-3 font-sans text-sm sm:text-base text-espresso-soft leading-relaxed max-w-md">
                  Every puppy comes vaccinated, dewormed, microchipped, and backed by our lifelong concierge support for complete peace of mind.
                </p>
              </div>

              {/* Upright Standing Poodle Mascot Neatly Placed (Zero Overlap with Text) */}
              <div className="mt-8 flex items-center justify-start">
                <PoodleMascot
                  pose="passport-stand"
                  className="w-32 h-28"
                  bubbleText="verified! 🐾"
                />
              </div>
            </div>

            {/* RIGHT PAGE: 4 Passport Stamps Arranged in 2x2 Grid */}
            <div className="pl-0 lg:pl-6 border-t-[1.5px] lg:border-t-0 border-espresso-border/20 pt-8 lg:pt-0">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 justify-items-center">
                {STAMPS_DATA.map((stamp) => (
                  <PassportStamp
                    key={stamp.title}
                    title={stamp.title}
                    description={stamp.description}
                    icon={stamp.icon}
                    color={stamp.color}
                    tiltDeg={stamp.tiltDeg}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
