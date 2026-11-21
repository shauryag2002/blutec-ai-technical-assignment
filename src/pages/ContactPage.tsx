import React, { useState, useRef, useEffect } from 'react';
import { PoodleMascot } from '../components/mascot/PoodleMascot';

interface ContactPuppyOption {
  id: string;
  label: string;
}

const CONTACT_PUPPIES: ContactPuppyOption[] = [
  { id: '', label: 'any puppy (not sure yet)' },
  { id: '4218427a-dd65-4b09-a089-584b912aa7ab', label: 'Max (Maltipoo, boy)' },
  { id: '0abcf3f5-0080-44c1-b1e1-2a2de24a3cf4', label: 'Korean Teacup Maltipoo (girl)' },
  { id: 'c5d2cf3c-51e8-4ecf-ac94-97ef8fceb6ec', label: 'Korean Teacup Poodle (girl)' },
  { id: '9cb7d6db-bf35-4e63-8e61-ca63e1925dbd', label: 'Maltipoo & Cavapoo (boy)' },
  { id: 'b39adb3f-eace-45af-a2e8-425de01ffc50', label: 'Toy Poodle (boy & girl)' },
  { id: '027d7333-a8b2-49de-9bbc-9a47af88ebac', label: 'Maltipoo (girl)' },
  { id: 'ec3a42bf-bd62-46ba-962d-8f94f09715c5', label: 'Pomeranian (girl)' },
  { id: 'e486e544-f1fd-48f9-8ba0-f556d7ee44e7', label: 'Copper (Cavapoo, boy)' },
  { id: 'd2d146b2-6454-4e05-967a-87f2ab02946d', label: 'Shih Tzu (girl)' },
  { id: '0fe92eee-1937-48e1-b48b-77292a6f25d8', label: 'Shih Tzu (boy)' },
  { id: '0deaea0d-1c0e-4e85-868b-3c7376358e03', label: 'Maltipoo (girl)' },
  { id: 'cbfa8ebd-7e0c-4818-b0ec-144ede4d3352', label: 'Maltipoo (girl)' },
  { id: '35d5e8bd-bebb-41c7-b0a9-256482edb3c8', label: 'Korean Teacup Pomeranian (girl)' },
  { id: '9fd5c518-a1ce-46d4-b9a4-8fb9714717f4', label: 'Korean Teacup Pomeranian (girl)' },
  { id: 'e838ce49-59e0-4f3e-ab83-55cd2d98d2a2', label: 'Korean Teacup Pomeranian (boy)' }
];

export const ContactPage: React.FC = () => {
  const [phase, setPhase] = useState<'writing' | 'sealing' | 'posting' | 'sent'>('writing');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    puppyId: '',
    message: '',
    website: '' // honeypot
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const postContainerRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const [containerMinHeight, setContainerMinHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website) return;

    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your name (at least 2 letters).';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      newErrors.phone = 'Please provide a valid contact number or WhatsApp number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Capture height for seamless folding animation
    if (postContainerRef.current) {
      setContainerMinHeight(postContainerRef.current.offsetHeight);
    }

    setPhase('sealing');

    setTimeout(() => {
      setPhase('posting');
    }, 750);

    setTimeout(() => {
      setContainerMinHeight(undefined);
      setPhase('sent');
      setTimeout(() => {
        sentRef.current?.focus({ preventScroll: true });
      }, 50);
    }, 1750);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      area: '',
      puppyId: '',
      message: '',
      website: ''
    });
    setErrors({});
    setPhase('writing');
  };

  return (
    <div data-page="contact" className="tp-page">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene"
        style={{
          '--sky-top': '#fff9ee',
          '--sky-bottom': '#f9dca4'
        } as React.CSSProperties}
        aria-labelledby="contact-title"
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1 id="contact-title" className="font-plush text-giant max-w-[12ch] lg:col-span-7">
              Get in touch with us
            </h1>
            <p className="text-lede text-[var(--ink-soft)] lg:col-span-5 lg:pb-3">
              Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d love to hear from you!
            </p>
          </header>

          {/* Main 2-column Grid */}
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">

            {/* Right Column (Desktop) / Form first on Mobile: tp-post letter */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <div
                ref={postContainerRef}
                className="tp-post"
                data-phase={phase}
                style={{ minHeight: containerMinHeight }}
              >
                {phase !== 'sent' && (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="tp-letterform"
                    aria-hidden={phase !== 'writing' ? true : undefined}
                  >
                    {/* Decorative Paw Stamp */}
                    <span aria-hidden="true" className="tp-letter__stamp">
                      <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true" fill="currentColor">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </span>

                    <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>

                    {/* Validation Errors Notice */}
                    {Object.keys(errors).length > 0 && (
                      <div role="alert" className="tp-letterform__alert">
                        <p className="font-semibold text-toffee-deep">Please check the letter details:</p>
                        <ul>
                          {Object.entries(errors).map(([k, msg]) => (
                            <li key={k} id={`${k}-err`}>{msg}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Mad-Libs Line 1: Name, Phone, Email */}
                    <p className="tp-letterform__line">
                      my name is{' '}
                      <span className="tp-blank" style={{ '--size': '16ch' } as React.CSSProperties}>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          aria-label="Your name (required)"
                          autoComplete="name"
                          required
                          minLength={2}
                          maxLength={80}
                          aria-invalid={!!errors.name}
                        />
                      </span>
                      , and you can reach me on{' '}
                      <span className="tp-blank" style={{ '--size': '15ch' } as React.CSSProperties}>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          aria-label="Phone or WhatsApp number with country code (required)"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          required
                          placeholder="+971 50 123 4567"
                          aria-invalid={!!errors.phone}
                        />
                      </span>{' '}
                      or by email at{' '}
                      <span className="tp-blank" style={{ '--size': '20ch' } as React.CSSProperties}>
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          aria-label="Email (optional)"
                          type="email"
                          autoComplete="email"
                          placeholder="optional"
                        />
                      </span>
                      .
                    </p>

                    {/* Mad-Libs Line 2: Area, Puppy Selection */}
                    <p className="tp-letterform__line">
                      I live in{' '}
                      <span className="tp-blank" style={{ '--size': '13ch' } as React.CSSProperties}>
                        <input
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          aria-label="Your area (optional)"
                          autoComplete="address-level2"
                          maxLength={80}
                          placeholder="e.g. Dubai Marina"
                        />
                      </span>
                      , and I&apos;m curious about{' '}
                      <span className="tp-blank tp-blank--select">
                        <label htmlFor="contact-puppy-select" className="sr-only">
                          Puppy you&apos;re interested in (optional)
                        </label>
                        <select
                          id="contact-puppy-select"
                          name="puppyId"
                          value={formData.puppyId}
                          onChange={handleInputChange}
                        >
                          {CONTACT_PUPPIES.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.label}
                            </option>
                          ))}
                        </select>
                      </span>
                      .
                    </p>

                    {/* Message Textarea */}
                    <label htmlFor="contact-note" className="sr-only">
                      Your message (optional)
                    </label>
                    <textarea
                      id="contact-note"
                      name="message"
                      rows={4}
                      maxLength={2000}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Anything else you'd like to tell us…"
                      className="tp-letterform__note"
                    />

                    {/* Anti-spam honeypot */}
                    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                      <label>
                        Website
                        <input
                          tabIndex={-1}
                          autoComplete="off"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>

                    {/* Sign-off & Submit */}
                    <div className="tp-letterform__sign">
                      <p className="font-scrawl">with love, a future puppy parent</p>
                      <button
                        type="submit"
                        disabled={phase !== 'writing'}
                        className="btn btn-primary disabled:opacity-70   px-7 py-3 text-base font-semibold shrink-0"
                      >
                        {phase === 'sealing' ? 'Sealing the envelope…' : 'Post my letter'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Animated Postbox & Envelope Scene for sealing/posting */}
                {(phase === 'sealing' || phase === 'posting') && (
                  <div aria-hidden="true" className="tp-post__scene">
                    <svg viewBox="0 0 160 112" className="tp-post__envelope">
                      <rect x="4" y="18" width="152" height="90" rx="6" fill="#fffdf8" stroke="#2a170e" strokeWidth="4" />
                      <path d="M6 104 64 62M154 104 96 62" fill="none" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" />
                      <path className="tp-post__flap" d="M6 22 80 74 154 22" fill="#fbe3b4" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
                      <circle cx="80" cy="72" r="11" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" />
                    </svg>

                    <svg viewBox="0 0 200 260" className="tp-post__box">
                      <rect x="86" y="170" width="28" height="86" fill="#5a3a28" stroke="#2a170e" strokeWidth="4" />
                      <path d="M30 70a70 54 0 0 1 140 0v104H30z" fill="#c2622b" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
                      <rect x="58" y="86" width="84" height="14" rx="7" fill="#2a170e" />
                      <path d="M44 128h112" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" opacity=".35" />
                      <g className="tp-post__flag">
                        <path d="M170 120V64" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" />
                        <path d="M170 64h22v16h-22" fill="#f2be6b" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
                      </g>
                    </svg>
                  </div>
                )}

                {/* Sent / Confirmation State */}
                {phase === 'sent' && (
                  <div ref={sentRef} tabIndex={-1} role="status" className="tp-post__sent">
                    <svg viewBox="0 0 200 150" aria-hidden="true" className="tp-post__box tp-post__box--sent">
                      <rect x="86" y="96" width="28" height="52" fill="#5a3a28" stroke="#2a170e" strokeWidth="4" />
                      <path d="M30 50a70 44 0 0 1 140 0v52H30z" fill="#c2622b" stroke="#2a170e" strokeWidth="5" strokeLinejoin="round" />
                      <rect x="58" y="58" width="84" height="12" rx="6" fill="#2a170e" />
                      <path d="M170 92V22" stroke="#2a170e" strokeWidth="5" strokeLinecap="round" />
                      <path d="M170 22h22v16h-22" fill="#f2be6b" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
                    </svg>
                    <p className="font-plush mt-4 text-[2rem]">Message received!</p>
                    <p className="mx-auto mt-2 max-w-[40ch] text-cocoa-soft">
                      Thank you — our team will get back to you promptly. For the quickest reply, message us on WhatsApp.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a
                        href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp"
                      >
                        WhatsApp us
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn btn-ghost !bg-milk"
                      >
                        Write another letter
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Teddy Waiting For Your Letter Mascot */}
              <div
                className="pup-buddy ml-auto mr-6 -mt-3 w-36 md:w-40"
                data-live=""
                data-facing="left"
              >
                <PoodleMascot
                  pose="sit"
                  facing="left"
                  bubbleText={isTyping ? 'ooh!' : undefined}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Left Column (Desktop) / Contact Methods & Showroom Card */}
            <div className="lg:col-span-5 lg:row-start-1">
              <a
                href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full sm:w-auto   px-7 py-3 text-base font-semibold shrink-0"
              >
                WhatsApp +971 50 000 0000
              </a>

              {/* Direct Call & Email */}
              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="font-scrawl text-[var(--ink-soft)]">call us</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    <a className="link-ink text-cocoa hover:text-toffee" href="tel:+971500000000">
                      +971 50 000 0000
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-scrawl text-[var(--ink-soft)]">email</dt>
                  <dd className="mt-1 break-all text-lg font-semibold">
                    <a className="link-ink text-cocoa hover:text-toffee" href="mailto:info@instabizweb.com">
                      info@instabizweb.com
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Downtown Dubai Showroom Section */}
              <section aria-labelledby="visit-title" className="tp-shopfront mt-12">
                {/* Decorative Downtown Dubai skyline silhouette */}
                <svg
                  viewBox="0 0 300 120"
                  className="absolute -bottom-1 right-0 w-3/4 text-toffee/30"
                  aria-hidden="true"
                >
                  <path
                    d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="tp-visit relative p-7 pt-6">
                  <div>
                    <h2 id="visit-title" className="font-plush text-[2rem] leading-tight">
                      Visit us in Downtown Dubai
                    </h2>
                    <p className="mt-3 max-w-[38ch] text-cocoa-soft">
                      Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.
                    </p>
                    <p className="mt-4 flex items-center gap-2 font-semibold text-cocoa">
                      <svg viewBox="0 0 64 64" className="size-5 shrink-0 text-toffee-deep" aria-hidden="true" fill="currentColor">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                      Downtown Dubai, United Arab Emirates
                    </p>
                    <a
                      href="https://maps.google.com/?q=Downtown+Dubai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost mt-6 !bg-milk   px-7 py-3 text-base font-semibold shrink-0"
                    >
                      Open in Google Maps
                    </a>
                  </div>

                  <figure className="tp-visit__photo">
                    <img
                      alt="The apricot teddy bear puppy from our showroom, held up to say hello"
                      loading="lazy"
                      src="/puppies/showroom-apricot.jpg"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: '45.3% 44.4%' }}
                    />
                  </figure>
                </div>
              </section>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
