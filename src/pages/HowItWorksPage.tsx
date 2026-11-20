import React, { useState, useEffect } from 'react';
import { Store, Plane, Truck } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState<'dubai' | 'imported'>('dubai');

  return (
    <div className="py-12 sm:py-16 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 select-none">
          <span className="font-script text-terracotta text-2xl font-bold">
            clear & transparent
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-espresso tracking-tight mt-1">
            How it works
          </h1>
          <p className="mt-3 font-sans text-base sm:text-lg text-espresso/80">
            A step-by-step walkthrough of our Downtown Dubai showroom visits and Korean Teacup import process.
          </p>
        </div>

        {/* Segmented Pill Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full border-2 border-espresso bg-cream-light shadow-hard-sm">
            <button
              onClick={() => setActiveTab('dubai')}
              className={`px-6 py-2.5 rounded-full font-display font-bold text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'dubai'
                  ? 'bg-terracotta text-white shadow-hard-sm'
                  : 'text-espresso hover:text-terracotta'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>In Dubai (meet in person)</span>
            </button>
            <button
              onClick={() => setActiveTab('imported')}
              className={`px-6 py-2.5 rounded-full font-display font-bold text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'imported'
                  ? 'bg-terracotta text-white shadow-hard-sm'
                  : 'text-espresso hover:text-terracotta'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Imported (order upon request)</span>
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'dubai' ? (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 bg-cream-light border-2 border-espresso rounded-3xl shadow-hard-md">
              <span className="text-terracotta font-mono text-xs font-bold uppercase">STEP 1</span>
              <h3 className="font-display font-bold text-2xl text-espresso mt-1">Browse Available Puppies</h3>
              <p className="font-sans text-sm sm:text-base text-espresso/80 mt-2">
                Explore our live online catalogue of puppies currently residing in our Downtown Dubai showroom. All photos and videos are 100% real and taken directly by our team.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-cream-light border-2 border-espresso rounded-3xl shadow-hard-md">
              <span className="text-terracotta font-mono text-xs font-bold uppercase">STEP 2</span>
              <h3 className="font-display font-bold text-2xl text-espresso mt-1">Book a Showroom Visit</h3>
              <p className="font-sans text-sm sm:text-base text-espresso/80 mt-2">
                Message us on WhatsApp to schedule a private bonding session in our clean, cozy showroom. Spend time playing and cuddling your favorite puppy before making a decision.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-cream-light border-2 border-espresso rounded-3xl shadow-hard-md">
              <span className="text-terracotta font-mono text-xs font-bold uppercase">STEP 3</span>
              <h3 className="font-display font-bold text-2xl text-espresso mt-1">Take Home Same-Day</h3>
              <p className="font-sans text-sm sm:text-base text-espresso/80 mt-2">
                Once adoption documents and veterinary clearances are signed, you can bring your new furry family member home the very same day, complete with a starter kit and health warranty.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 bg-cream-light border-2 border-espresso rounded-3xl shadow-hard-md">
              <span className="text-terracotta font-mono text-xs font-bold uppercase">STEP 1</span>
              <h3 className="font-display font-bold text-2xl text-espresso mt-1">Consultation & Breed Selection</h3>
              <p className="font-sans text-sm sm:text-base text-espresso/80 mt-2">
                Share your desired breed, size, coat color, and personality preferences. We connect directly with ethical, verified breeders in Seoul, South Korea.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-cream-light border-2 border-espresso rounded-3xl shadow-hard-md">
              <span className="text-terracotta font-mono text-xs font-bold uppercase">STEP 2</span>
              <h3 className="font-display font-bold text-2xl text-espresso mt-1">Flight Nanny & MOCCAE Permits</h3>
              <p className="font-sans text-sm sm:text-base text-espresso/80 mt-2">
                We handle the complete international import process: Korean Kennel Club export papers, UAE MOCCAE permits, rabies titers, microchipping, and in-cabin flight nanny accompaniment.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-cream-light border-2 border-espresso rounded-3xl shadow-hard-md">
              <span className="text-terracotta font-mono text-xs font-bold uppercase">STEP 3</span>
              <h3 className="font-display font-bold text-2xl text-espresso mt-1">Doorstep UAE Delivery</h3>
              <p className="font-sans text-sm sm:text-base text-espresso/80 mt-2">
                Upon arrival at Dubai International Airport (DXB), our certified vet conducts a post-arrival checkup before delivering your puppy straight to your home anywhere in the UAE.
              </p>
            </div>
          </div>
        )}

        {/* Dedicated #delivery Section */}
        <div id="delivery" className="mt-16 p-8 bg-honey-soft/50 border-2 border-espresso rounded-3xl shadow-hard-lg">
          <div className="flex items-center gap-3 mb-3">
            <Truck className="w-6 h-6 text-terracotta" />
            <h2 className="font-display font-black text-2xl sm:text-3xl text-espresso">
              Delivery & Collection Across the UAE
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-espresso/85 leading-relaxed">
            We provide temperature-controlled, stress-free door-to-door delivery across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. You may also collect directly from our Downtown Dubai showroom by appointment.
          </p>
        </div>

      </div>
    </div>
  );
};
