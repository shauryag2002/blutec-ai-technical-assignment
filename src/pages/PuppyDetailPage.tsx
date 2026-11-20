import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PUPPIES } from '../data/puppies';
import { CONTACT_DETAILS } from '../data/navigation';
import { StickerButton } from '../components/ui/StickerButton';
import { Shield, MessageCircle, ArrowLeft } from 'lucide-react';

export const PuppyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const puppy = PUPPIES.find((p) => p.slug === slug) || PUPPIES[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Image Gallery state
  const allImages = [puppy.image, ...(puppy.secondaryImages || [])];
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Enquiry postcard form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    message: `Hi TeddyPups, I would love to enquire about ${puppy.name} (${puppy.breed})!`
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
  };

  return (
    <div className="py-12 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/puppies"
          className="inline-flex items-center gap-2 font-display font-bold text-sm text-espresso hover:text-terracotta mb-6 select-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all puppies</span>
        </Link>

        {/* CHAPTER 1: Photo Carousel & Header */}
        <div className="bg-cream-light border-2 border-espresso rounded-3xl p-6 sm:p-8 shadow-hard-lg mb-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Gallery Strip */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square rounded-2xl border-2 border-espresso overflow-hidden bg-espresso/5 shadow-hard-md">
                <img
                  src={allImages[activeImgIndex]}
                  alt={puppy.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-espresso/80 text-white text-xs px-2.5 py-1 rounded-full font-mono">
                  {activeImgIndex + 1} / {allImages.length}
                </div>
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-2.5 mt-3">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden ${
                        activeImgIndex === idx ? 'border-terracotta ring-2 ring-honey' : 'border-espresso/30'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <span className="font-script text-terracotta text-xl font-bold">chapter 1 • introduction</span>
                <h1 className="font-display font-black text-3xl sm:text-4xl text-espresso tracking-tight mt-1">
                  {puppy.name}
                </h1>
                <p className="font-sans text-base text-espresso/70 mt-1">
                  {puppy.breed} • <span className="capitalize">{puppy.gender}</span> • {puppy.age}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {puppy.traits.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full border border-espresso/30 bg-honey-soft/50 text-xs font-display font-bold text-espresso">
                      ✓ {t}
                    </span>
                  ))}
                </div>

                <p className="mt-5 font-sans text-sm sm:text-base text-espresso/85 leading-relaxed">
                  {puppy.description}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-espresso/15 flex items-center gap-3">
                <StickerButton
                  href={CONTACT_DETAILS.whatsappUrl}
                  isExternal
                  variant="whatsapp"
                  size="md"
                  icon={<MessageCircle className="w-4 h-4 fill-current" />}
                >
                  WhatsApp enquiry
                </StickerButton>
              </div>
            </div>

          </div>
        </div>

        {/* CHAPTER 2: Health Checklist */}
        <div className="bg-cream-light border-2 border-espresso rounded-3xl p-6 sm:p-8 shadow-hard-lg mb-10">
          <span className="font-script text-terracotta text-xl font-bold">chapter 2 • vet certified</span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-espresso mt-1 mb-4">
            Health & Vaccination Checklist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {puppy.healthChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-honey-soft/30 border border-espresso/20">
                <Shield className="w-4 h-4 text-emerald shrink-0" />
                <span className="font-sans text-xs sm:text-sm text-espresso font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHAPTER 3: Postcard Enquiry Form */}
        <div className="bg-[#FFFDF8] border-2 border-espresso rounded-3xl p-6 sm:p-10 shadow-hard-xl">
          <div className="flex items-center justify-between border-b-2 border-dashed border-espresso/20 pb-4 mb-6">
            <div>
              <span className="font-script text-terracotta text-2xl font-bold">chapter 3 • dear TeddyPups...</span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-espresso mt-1">
                Postcard Enquiry
              </h2>
            </div>
            {/* Stitched Paw Postage Stamp */}
            <div className="w-16 h-16 rounded-xl border-2 border-dashed border-terracotta bg-honey-soft flex flex-col items-center justify-center p-1 text-center shadow-xs">
              <span className="text-base">🐾</span>
              <span className="text-[8px] font-mono font-bold text-terracotta uppercase">POSTAGE</span>
            </div>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center bg-cream-soft rounded-2xl border-2 border-espresso shadow-hard-sm">
              <span className="text-4xl">💌</span>
              <h3 className="font-display font-bold text-2xl text-espresso mt-3">Postcard Sent!</h3>
              <p className="font-sans text-sm text-espresso/80 mt-1">
                Our concierge team will reply on WhatsApp shortly regarding {puppy.name}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display font-bold uppercase text-espresso/70 mb-1">
                    Your name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-espresso bg-cream text-espresso font-sans text-sm focus:outline-none focus:ring-2 focus:ring-honey"
                    placeholder="Sarah Mansoor"
                  />
                </div>
                <div>
                  <label className="block text-xs font-display font-bold uppercase text-espresso/70 mb-1">
                    Phone or WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-espresso bg-cream text-espresso font-sans text-sm focus:outline-none focus:ring-2 focus:ring-honey"
                    placeholder="+971 50 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-bold uppercase text-espresso/70 mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-espresso bg-cream text-espresso font-sans text-sm focus:outline-none focus:ring-2 focus:ring-honey"
                />
              </div>

              <StickerButton type="submit" variant="primary" size="md">
                Send my postcard
              </StickerButton>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
