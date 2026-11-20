import React, { useEffect } from 'react';
import { Search } from 'lucide-react';
import { PushpinNoteCard } from '../components/ui/PushpinNoteCard';
import { PoodleMascot } from '../components/mascot/PoodleMascot';
import { FAQS } from '../data/faqs';
import { useFaqSearch } from '../hooks/useFaqSearch';

export const FaqPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    searchTerm,
    setSearchTerm,
    openId,
    toggleCard,
    filteredFaqs,
    matchCount
  } = useFaqSearch(FAQS);

  return (
    <div className="py-12 sm:py-16 bg-[#FDF6EC] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 select-none">
          <span className="font-script text-terracotta text-2xl font-bold">
            corkboard answers
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-espresso tracking-tight mt-1">
            Frequently asked questions
          </h1>
          <p className="mt-3 font-sans text-base sm:text-lg text-espresso/80">
            {matchCount} {matchCount === 1 ? 'note' : 'notes'} on the board
          </p>
        </div>

        {/* Live Search Bar & Mascot */}
        <div className="max-w-xl mx-auto mb-14 relative flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="sniff out a question..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full border-2 border-espresso bg-cream-light text-espresso font-sans text-base shadow-hard-sm focus:outline-none focus:ring-2 focus:ring-honey"
            />
            <Search className="w-5 h-5 text-espresso/50 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          <div className="hidden sm:block absolute -right-24 top-1/2 -translate-y-1/2">
            <PoodleMascot
              pose="think"
              className="w-20 h-16"
              bubbleText={openId ? 'hm! 🐾' : '?'}
            />
          </div>
        </div>

        {/* Corkboard Grid of 9 Pinned Notes */}
        <div className="p-6 sm:p-10 rounded-3xl border-[3px] border-espresso bg-[#DEB887]/30 shadow-hard-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {filteredFaqs.map((faq, idx) => {
              const tilt = (idx % 3 === 0 ? -2 : idx % 3 === 1 ? 2.5 : -1.5);
              const pinColor = idx % 2 === 0 ? '#B8502D' : '#D8A24A';
              return (
                <PushpinNoteCard
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openId === faq.id}
                  onToggle={() => toggleCard(faq.id)}
                  tiltDeg={tilt}
                  pinColor={pinColor}
                  isSparkle={faq.isSparkle}
                />
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

