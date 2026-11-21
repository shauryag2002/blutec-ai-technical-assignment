import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PUPPIES } from '../data/puppies';
import { PoodleMascot } from '../components/mascot/PoodleMascot';

export const PuppyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Find puppy or default to first
  const currentIndex = PUPPIES.findIndex((p) => p.slug === slug);
  const puppy = currentIndex !== -1 ? PUPPIES[currentIndex] : PUPPIES[0];

  // Calculate Previous and Next puppies
  const safeIdx = currentIndex !== -1 ? currentIndex : 0;
  const prevPup = PUPPIES[(safeIdx - 1 + PUPPIES.length) % PUPPIES.length];
  const nextPup = PUPPIES[(safeIdx + 1) % PUPPIES.length];

  // Images list
  const photos = [puppy.image, ...(puppy.secondaryImages || [])];
  const [prevSlug, setPrevSlug] = useState(slug);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (prevSlug !== slug) {
    setPrevSlug(slug);
    setActivePhotoIndex(0);
  }

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Scroll reading ribbon progress
  const [ribbonProgress, setRibbonProgress] = useState(0.12);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const p = (window.scrollY + window.innerHeight * 0.15) / scrollHeight;
        setRibbonProgress(Math.min(1, Math.max(0.1, p)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
      }
      if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, photos.length]);

  // Enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    message: `Hi! I'd love to know more about ${puppy.name}.`
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitted(true);
  };

  return (
    <div data-page="pup" className="tp-page">
      <article
        className="tp-storybook"
        style={{
          background: 'linear-gradient(180deg, color-mix(in oklab, #f8d8b8 24%, var(--color-milk)) 0, var(--color-milk) 85%)'
        }}
      >
        {/* Ribbon reading progress bar */}
        <div aria-hidden="true" className="tp-ribbon">
          <div className="tp-ribbon__track">
            <span
              className="tp-ribbon__band"
              style={{ transform: `scaleY(${ribbonProgress})` }}
            />
          </div>
        </div>

        {/* Structured JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Puppies',
                  item: 'https://puppy.instabizweb.com/puppies'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: puppy.name,
                  item: `https://puppy.instabizweb.com/puppies/${puppy.slug}`
                }
              ]
            })
          }}
        />

        <div className="gutter mx-auto max-w-[110rem] pb-20 pt-8 md:pt-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-[0.95rem] font-semibold text-cocoa-soft">
            <Link className="link-ink" to="/puppies">
              Available puppies
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page" className="text-cocoa font-bold">
              {puppy.name}
            </span>
          </nav>

          {/* CHAPTER 1 */}
          <p className="tp-chapter mt-6">
            <span aria-hidden="true" className="tp-chapter__n font-plush">
              1
            </span>
            <span className="font-scrawl">hello, it's me</span>
          </p>

          <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Photo Gallery */}
            <div className="min-w-0 lg:col-span-7">
              <div>
                <div className="tp-storypage relative aspect-[4/5] md:aspect-[5/6]">
                  <button
                    type="button"
                    className="absolute inset-0 block size-full cursor-zoom-in text-left"
                    aria-label={`Open ${puppy.name}, photo ${activePhotoIndex + 1} of ${photos.length} full screen`}
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <img
                      alt={`Female ${puppy.name} puppy`}
                      src={photos[activePhotoIndex]}
                      className="absolute inset-0 size-full object-cover"
                    />
                  </button>

                  <div className="absolute inset-x-4 bottom-4 flex justify-between pointer-events-none">
                    <button
                      type="button"
                      className="grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold text-cocoa pointer-events-auto transition-transform active:scale-95 hover:bg-milk shadow-md"
                      aria-label="Previous photo"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
                      }}
                    >
                      ‹
                    </button>
                    <span className="self-center rounded-full bg-cocoa/80 px-3 py-1 text-sm font-semibold text-milk">
                      {activePhotoIndex + 1} / {photos.length}
                    </span>
                    <button
                      type="button"
                      className="grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold text-cocoa pointer-events-auto transition-transform active:scale-95 hover:bg-milk shadow-md"
                      aria-label="Next photo"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePhotoIndex((prev) => (prev + 1) % photos.length);
                      }}
                    >
                      ›
                    </button>
                  </div>
                </div>

                {/* Thumbnails filmstrip */}
                <ul
                  className="mt-3 flex gap-3 overflow-x-auto px-1 pb-2 pt-2 [scrollbar-width:thin]"
                  aria-label={`All photos of ${puppy.name}`}
                >
                  {photos.map((photo, idx) => {
                    const isActive = idx === activePhotoIndex;
                    return (
                      <li key={idx} className="shrink-0">
                        <button
                          type="button"
                          aria-label={`${puppy.name}, photo ${idx + 1} of ${photos.length}`}
                          aria-current={isActive}
                          onClick={() => setActivePhotoIndex(idx)}
                          className={`relative block h-24 w-20 overflow-hidden rounded-[0.9rem] border-[3px] transition-transform duration-300 md:h-28 md:w-24 ${isActive
                            ? '-rotate-3 -translate-y-1 border-toffee-deep'
                            : 'border-cocoa/30 hover:-rotate-2 hover:border-cocoa'
                            }`}
                        >
                          <img
                            alt=""
                            src={photo}
                            className="absolute inset-0 size-full object-cover"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Right Column: Passport Board Tag & Chapter 2 */}
            <div className="min-w-0 lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+5.5rem)]">
                <div
                  className="tp-tag tp-board mt-16 !rounded-[2.2rem_2.2rem_2.2rem_0.6rem] !p-7 md:!p-9 lg:mt-20"
                  data-reveal="true"
                  data-revealed="true"
                >
                  <span aria-hidden="true" className="tp-tag__ring" />

                  {/* Teddy Mascot buddy peeking over tag */}
                  <div
                    className="pup-buddy absolute -top-[4.8rem] right-6 w-[9.5rem] pointer-events-none"
                    data-live=""
                    data-facing="right"
                  >
                    <PoodleMascot pose="peek" />
                  </div>

                  {/* Status chip */}
                  <span className="chip">
                    <svg viewBox="0 0 64 64" className="size-4 text-toffee" aria-hidden="true" fill="currentColor">
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                    </svg>
                    Available
                  </span>

                  <h1 className="font-plush mt-4 text-[clamp(2.6rem,5vw,4.6rem)] text-cocoa leading-[1.05]">
                    {puppy.name}
                  </h1>

                  {/* Specifications */}
                  <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Breed</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold text-cocoa">{puppy.breed}</dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Boy or girl</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold text-cocoa capitalize">{puppy.gender}</dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Age</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold text-cocoa">{puppy.age}</dd>
                    </div>
                    <div>
                      <dt className="font-scrawl text-sm text-cocoa-soft">Where</dt>
                      <dd className="mt-0.5 text-[1.05rem] font-semibold text-cocoa">
                        {puppy.collection === 'dubai' ? 'Downtown Dubai showroom' : 'Imported for you'}
                      </dd>
                    </div>
                  </dl>

                  {/* CTAs */}
                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href={`https://wa.me/971500000000?text=${encodeURIComponent(
                        `Hi TeddyPups, I'd like to ask about ${puppy.name} (${puppy.breed}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp w-full text-center  px-7 py-3 text-base font-semibold shrink-0"
                    >
                      Ask about this puppy on WhatsApp
                    </a>
                    <a
                      href={`#enquire-${puppy.slug}`}
                      className="btn btn-ghost w-full text-center  px-7 py-3 text-base font-semibold shrink-0"
                    >
                      Send an enquiry
                    </a>
                  </div>
                </div>

                {/* CHAPTER 2: Inclusions Paper Card */}
                <div className="tp-paper mt-8 -rotate-1">
                  <p className="tp-chapter">
                    <span aria-hidden="true" className="tp-chapter__n font-plush">
                      2
                    </span>
                    <span className="font-scrawl">what comes with this {puppy.name}</span>
                  </p>
                  <h2 className="font-plush mt-1 text-[1.9rem] text-cocoa">Every Teddy Pup comes</h2>
                  <ul className="mt-4 space-y-2.5 text-cocoa">
                    <li className="flex items-start gap-3 font-semibold">
                      <svg viewBox="0 0 32 32" className="mt-0.5 size-6 shrink-0 text-toffee-deep" aria-hidden="true">
                        <path d="M5 17l7 7L27 8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Vaccinated
                    </li>
                    <li className="flex items-start gap-3 font-semibold">
                      <svg viewBox="0 0 32 32" className="mt-0.5 size-6 shrink-0 text-toffee-deep" aria-hidden="true">
                        <path d="M5 17l7 7L27 8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Dewormed
                    </li>
                    <li className="flex items-start gap-3 font-semibold">
                      <svg viewBox="0 0 32 32" className="mt-0.5 size-6 shrink-0 text-toffee-deep" aria-hidden="true">
                        <path d="M5 17l7 7L27 8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Verified health certificate
                    </li>
                    <li className="flex items-start gap-3 font-semibold">
                      <svg viewBox="0 0 32 32" className="mt-0.5 size-6 shrink-0 text-toffee-deep" aria-hidden="true">
                        <path d="M5 17l7 7L27 8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Thoroughly checked before joining your family
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CHAPTER 3: The Way Home */}
          <section aria-labelledby={`home-steps-${puppy.slug}`} className="mt-20">
            <p className="tp-chapter">
              <span aria-hidden="true" className="tp-chapter__n font-plush">
                3
              </span>
              <span className="font-scrawl">the way home</span>
            </p>
            <h2 id={`home-steps-${puppy.slug}`} className="font-plush text-big mt-3 text-cocoa">
              Coming home from abroad
            </h2>
            <ol className="tp-trail tp-trail--row tp-trail--paws mt-10">
              <li>
                <span aria-hidden="true" className="tp-trail__num font-plush">
                  1
                </span>
                <h3 className="font-plush-text text-xl font-bold leading-tight text-cocoa">
                  Reserve your puppy
                </h3>
                <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                  Tell us which puppy has captured your heart.
                </p>
              </li>
              <li>
                <span aria-hidden="true" className="tp-trail__num font-plush">
                  2
                </span>
                <h3 className="font-plush-text text-xl font-bold leading-tight text-cocoa">
                  Personalized consultation
                </h3>
                <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                  We finalize details with you and share updates on your puppy's journey.
                </p>
              </li>
              <li>
                <span aria-hidden="true" className="tp-trail__num font-plush">
                  3
                </span>
                <h3 className="font-plush-text text-xl font-bold leading-tight text-cocoa">
                  Import and arrival
                </h3>
                <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                  We manage health checks, travel arrangements, and documentation.
                </p>
              </li>
              <li>
                <span aria-hidden="true" className="tp-trail__num font-plush">
                  4
                </span>
                <h3 className="font-plush-text text-xl font-bold leading-tight text-cocoa">
                  Welcome home
                </h3>
                <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                  We help your new puppy settle in and ensure a smooth transition into your home.
                </p>
              </li>
            </ol>
          </section>

          {/* CHAPTER 4: Enquiry Postcard */}
          <section
            id={`enquire-${puppy.slug}`}
            aria-labelledby={`enquire-title-${puppy.slug}`}
            className="tp-letter mt-20 grid gap-10 lg:grid-cols-12"
          >
            <span aria-hidden="true" className="tp-letter__stamp">
              <svg viewBox="0 0 64 64" className="size-9 text-toffee-deep" aria-hidden="true" fill="currentColor">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
            </span>

            <div className="lg:col-span-4">
              <p className="tp-chapter">
                <span aria-hidden="true" className="tp-chapter__n font-plush">
                  4
                </span>
                <span className="font-scrawl">dear TeddyPups…</span>
              </p>
              <h2 id={`enquire-title-${puppy.slug}`} className="font-plush text-big mt-2 text-cocoa">
                Ask about this puppy
              </h2>
              <p className="mt-4 text-cocoa-soft leading-relaxed">
                Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest reply.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              {isSubmitted ? (
                <div className="rounded-2xl border-2 border-cocoa/30 bg-honey-soft/40 p-8 text-center shadow-inner">
                  <span className="text-4xl">💌</span>
                  <h3 className="font-plush text-2xl text-cocoa mt-3">Enquiry sent!</h3>
                  <p className="mt-2 text-base text-cocoa-soft max-w-md mx-auto">
                    Thank you for asking about {puppy.name}. Our concierge team will reach out to you via WhatsApp or phone shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="enquire-name" className="block text-[0.95rem] font-semibold text-cocoa">
                        Your name<span className="text-toffee-ink"> *</span>
                      </label>
                      <input
                        id="enquire-name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={80}
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base text-cocoa outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                      />
                    </div>

                    <div>
                      <label htmlFor="enquire-phone" className="block text-[0.95rem] font-semibold text-cocoa">
                        Phone or WhatsApp<span className="text-toffee-ink"> *</span>
                      </label>
                      <input
                        id="enquire-phone"
                        name="phone"
                        type="tel"
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base text-cocoa outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                      />
                      <p id="enquire-phone-hint" className="mt-1 text-sm text-cocoa-soft">
                        With country code, e.g. +971 50 123 4567
                      </p>
                    </div>

                    <div>
                      <label htmlFor="enquire-email" className="block text-[0.95rem] font-semibold text-cocoa">
                        Email<span className="font-normal text-cocoa-soft"> (optional)</span>
                      </label>
                      <input
                        id="enquire-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base text-cocoa outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                      />
                    </div>

                    <div>
                      <label htmlFor="enquire-area" className="block text-[0.95rem] font-semibold text-cocoa">
                        Your area<span className="font-normal text-cocoa-soft"> (optional)</span>
                      </label>
                      <input
                        id="enquire-area"
                        name="area"
                        type="text"
                        maxLength={80}
                        autoComplete="address-level2"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base text-cocoa outline-none transition-[border-color,box-shadow] focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                      />
                      <p id="enquire-area-hint" className="mt-1 text-sm text-cocoa-soft">
                        e.g. Dubai Marina
                      </p>
                    </div>
                  </div>

                  <input type="hidden" value={puppy.id} name="puppyId" />

                  <div>
                    <label htmlFor="enquire-message" className="block text-[0.95rem] font-semibold text-cocoa">
                      Message <span className="font-normal text-cocoa-soft">(optional)</span>
                    </label>
                    <textarea
                      id="enquire-message"
                      name="message"
                      rows={4}
                      maxLength={2000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1.5 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 py-3 text-base text-cocoa outline-none focus:border-cocoa focus:shadow-[0_0_0_4px_rgb(242_190_107/0.6)]"
                    />
                  </div>

                  {/* Honeypot */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Website
                      <input tabIndex={-1} autoComplete="off" defaultValue="" name="website" />
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary w-full disabled:opacity-70 sm:w-auto  px-7 py-3 text-base font-semibold shrink-0">
                    Send enquiry
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Bottom Navigation: Previous Pup & Next Pup */}
          <nav aria-label="More puppies" className="mt-16 grid gap-4 sm:grid-cols-2">
            <Link
              to={`/puppies/${prevPup.slug}`}
              className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1"
            >
              <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                <img
                  alt={`${prevPup.name} puppy`}
                  src={prevPup.image}
                  className="size-full object-cover"
                />
              </span>
              <span>
                <span className="font-scrawl block text-sm text-cocoa-soft">Previous pup</span>
                <span className="font-plush text-[1.6rem] text-cocoa">{prevPup.name}</span>
              </span>
            </Link>

            <Link
              to={`/puppies/${nextPup.slug}`}
              className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1 sm:flex-row-reverse sm:text-right"
            >
              <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                <img
                  alt={`${nextPup.name} puppy`}
                  src={nextPup.image}
                  className="size-full object-cover"
                />
              </span>
              <span>
                <span className="font-scrawl block text-sm text-cocoa-soft">Next pup</span>
                <span className="font-plush text-[1.6rem] text-cocoa">{nextPup.name}</span>
              </span>
            </Link>
          </nav>
        </div>

        {/* Full-screen Lightbox Dialog */}
        {isLightboxOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${puppy.name} photos`}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-cocoa/95 p-4 sm:p-6 text-milk"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4">
              <span className="text-sm font-semibold text-milk/80">
                {activePhotoIndex + 1} of {photos.length}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="grid size-10 place-items-center rounded-full bg-milk/10 text-2xl font-bold text-milk hover:bg-milk/20 transition-colors"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            {/* Main Image with Navigation Arrows */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden">
              <button
                type="button"
                onClick={() => setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)}
                className="absolute left-2 z-10 grid size-12 place-items-center rounded-full bg-milk/20 text-3xl font-bold text-milk hover:bg-milk/40 transition-colors"
                aria-label="Previous photo"
              >
                ‹
              </button>

              <img
                src={photos[activePhotoIndex]}
                alt={puppy.name}
                className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />

              <button
                type="button"
                onClick={() => setActivePhotoIndex((prev) => (prev + 1) % photos.length)}
                className="absolute right-2 z-10 grid size-12 place-items-center rounded-full bg-milk/20 text-3xl font-bold text-milk hover:bg-milk/40 transition-colors"
                aria-label="Next photo"
              >
                ›
              </button>
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="mt-4 flex justify-center gap-3 overflow-x-auto py-2">
              {photos.map((photo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${idx === activePhotoIndex ? 'border-honey scale-105' : 'border-milk/30 opacity-70 hover:opacity-100'
                    }`}
                >
                  <img src={photo} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
