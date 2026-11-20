import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { StickerButton } from '../components/ui/StickerButton';
import { CONTACT_DETAILS } from '../data/navigation';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mad-Libs form state
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [breed, setBreed] = useState('any puppy (not sure yet)');
  const [message, setMessage] = useState('');
  const [isPosted, setIsPosted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;
    setIsPosted(true);
  };

  return (
    <div className="py-12 sm:py-16 bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 select-none">
          <span className="font-script text-terracotta text-2xl font-bold">
            we'd love to meet you
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-espresso tracking-tight mt-1">
            Visit & contact
          </h1>
          <p className="mt-3 font-sans text-base sm:text-lg text-espresso/80">
            Come visit our Downtown Dubai showroom or write us a letter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Showroom Information Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl border-2 border-espresso bg-cream-light shadow-hard-lg">
              <h3 className="font-display font-bold text-2xl text-espresso mb-4">
                Downtown Dubai Showroom
              </h3>

              <ul className="space-y-4 font-sans text-sm text-espresso/85">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-espresso">Address</span>
                    <span>{CONTACT_DETAILS.address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-honey-deep shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-espresso">Opening Hours</span>
                    <span>{CONTACT_DETAILS.showroomHours}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-espresso">WhatsApp</span>
                    <span>{CONTACT_DETAILS.whatsappDisplay}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-sky-deep shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-espresso">Email</span>
                    <span>{CONTACT_DETAILS.email}</span>
                  </div>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-espresso/15">
                <StickerButton
                  href={CONTACT_DETAILS.whatsappUrl}
                  isExternal
                  variant="whatsapp"
                  size="md"
                  icon={<MessageCircle className="w-4 h-4 fill-current" />}
                >
                  Message on WhatsApp
                </StickerButton>
              </div>
            </div>
          </div>

          {/* Right Column: Mad-Libs Fill-in-the-Blank Letter Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl border-2 border-espresso bg-[#FFFDF8] shadow-hard-xl relative overflow-hidden">

              {/* Top Postage Stamp Decoration */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-espresso/20 pb-4 mb-6">
                <div>
                  <span className="font-script text-terracotta text-2xl font-bold">handwritten note</span>
                  <h3 className="font-display font-black text-2xl text-espresso">
                    Post a Letter to TeddyPups
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-xl border-2 border-dashed border-terracotta bg-honey-soft flex flex-col items-center justify-center p-1 text-center shadow-xs">
                  <span className="text-base">🐾</span>
                  <span className="text-[7px] font-mono font-bold text-terracotta uppercase">AIR MAIL</span>
                </div>
              </div>

              {isPosted ? (
                <div className="p-8 text-center bg-cream-soft rounded-2xl border-2 border-espresso shadow-hard-sm">
                  <span className="text-4xl">📬</span>
                  <h4 className="font-display font-bold text-2xl text-espresso mt-3">Letter Posted!</h4>
                  <p className="font-sans text-sm text-espresso/80 mt-1">
                    Thank you {name}, we received your note and will be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="font-display text-base sm:text-lg text-espresso leading-loose space-y-4">
                  <p>
                    Dear TeddyPups,
                  </p>
                  <p>
                    My name is{' '}
                    <input
                      type="text"
                      required
                      placeholder="your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-b-2 border-terracotta bg-transparent px-2 py-0.5 text-terracotta font-bold focus:outline-none inline-block w-40 sm:w-48"
                    />
                    , and you can reach me at{' '}
                    <input
                      type="text"
                      required
                      placeholder="phone or email"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="border-b-2 border-terracotta bg-transparent px-2 py-0.5 text-terracotta font-bold focus:outline-none inline-block w-44 sm:w-56"
                    />
                    .
                  </p>
                  <p>
                    I would love to learn more about{' '}
                    <select
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="border-b-2 border-terracotta bg-cream-soft px-2 py-1 text-terracotta font-bold rounded-lg focus:outline-none inline-block"
                    >
                      <option value="any puppy (not sure yet)">any puppy (not sure yet)</option>
                      <option value="Maltipoo">Maltipoo</option>
                      <option value="Korean Teacup">Korean Teacup</option>
                      <option value="Pomeranian">Pomeranian</option>
                      <option value="Poodle">Poodle</option>
                      <option value="Cavapoo">Cavapoo</option>
                      <option value="Shih Tzu">Shih Tzu</option>
                    </select>
                    .
                  </p>
                  <div>
                    <label className="block text-xs font-sans text-espresso/60 uppercase font-bold mt-4 mb-1">
                      A little note:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your home, family, or any special requests..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 rounded-xl border-2 border-espresso bg-cream text-espresso font-sans text-sm focus:outline-none"
                    />
                  </div>

                  <div className="pt-4">
                    <StickerButton type="submit" variant="primary" size="lg">
                      Post my letter ✉
                    </StickerButton>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

