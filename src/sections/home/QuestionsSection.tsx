import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { StickerButton } from '../../components/ui/StickerButton';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';
import { FAQS } from '../../data/faqs';

export const QuestionsSection: React.FC = () => {
  const sparkleFaqs = FAQS.filter((f) => f.isSparkle);

  return (
    <section id="questions-section" className="relative pt-20 pb-16 bg-[#23170F] text-cream-light overflow-hidden">
      {/* Twinkling Gold Stars Background */}
      <div className="absolute inset-0 pointer-events-none opacity-85">
        <div className="absolute top-10 left-12 text-honey text-sm animate-twinkle">✦</div>
        <div className="absolute top-32 right-1/4 text-honey text-xs animate-twinkle" style={{ animationDelay: '0.7s' }}>✦</div>
        <div className="absolute bottom-20 left-1/3 text-honey text-base animate-twinkle" style={{ animationDelay: '1.2s' }}>✦</div>
        <div className="absolute bottom-16 right-16 text-honey text-xs animate-twinkle" style={{ animationDelay: '0.4s' }}>✦</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 select-none">
            <span className="font-script text-honey text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-honey" />
              <span>peace of mind</span>
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-cream-light tracking-tight mt-1">
              Questions, answered
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-cream/75 leading-relaxed">
              Everything you need to know about puppy health clearances, visits to our Downtown showroom, and safe delivery across the UAE.
            </p>

            <div className="mt-8">
              <StickerButton
                to="/faq"
                variant="cream"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Read all questions
              </StickerButton>
            </div>

            {/* Standing Poodle Mascot with Question Bubble */}
            <div className="mt-12 flex items-center">
              <PoodleMascot pose="think" className="w-32 h-28" bubbleText="curious? 🐾" />
            </div>
          </div>

          {/* Right Column: 3 Clean Q&A Cards with Gold Sparkles */}
          <div className="lg:col-span-7 space-y-4">
            {sparkleFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-[#2E1E14] text-cream-light p-6 sm:p-7 rounded-2xl border-[1.5px] border-cream/15 shadow-sm hover:border-cream/30 transition-all select-none"
              >
                <div className="flex items-start gap-3.5">
                  <span className="text-honey text-base shrink-0 mt-0.5">✦</span>
                  <div>
                    <h3 className="font-sans font-semibold text-lg text-cream-light mb-1.5">
                      {faq.question}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-cream/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
