import React, { useEffect, useRef, useState } from 'react';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';

interface PolaroidItem {
  id: number;
  caption: string;
  image: string;
  tilt: string;
  tape: string;
  tapeType: 'center' | 'left' | 'right' | 'corners';
  delay: string;
  bgColor: string;
  pupLook?: boolean;
}

const POLAROIDS: PolaroidItem[] = [
  {
    id: 1,
    caption: 'Lulu 🧸 with her new mummy ❤️',
    image: '/puppies/family-1.jpg',
    tilt: '-2.2deg',
    tape: '#f6d79a',
    tapeType: 'center',
    delay: '330ms',
    bgColor: 'rgb(216, 184, 152)',
  },
  {
    id: 2,
    caption: 'Adorable Maltipoo baby 🧸❤️',
    image: '/puppies/family-2.jpg',
    tilt: '1.6deg',
    tape: '#f9cdbf',
    tapeType: 'left',
    delay: '0ms',
    bgColor: 'rgb(216, 184, 136)',
    pupLook: true,
  },
  {
    id: 3,
    caption: 'My new teddy puppy 🥰🧸',
    image: '/puppies/family-3.jpg',
    tilt: '-0.9deg',
    tape: '#cfe5f6',
    tapeType: 'right',
    delay: '550ms',
    bgColor: 'rgb(200, 184, 152)',
  },
  {
    id: 4,
    caption: 'Our new puppies 🧸🥰🤗',
    image: '/puppies/family-4.jpg',
    tilt: '2.4deg',
    tape: '#f6d79a',
    tapeType: 'corners',
    delay: '110ms',
    bgColor: 'rgb(200, 168, 136)',
  },
  {
    id: 5,
    caption: 'New puppy 🧸😍',
    image: '/puppies/family-5.jpg',
    tilt: '-1.5deg',
    tape: '#e9dcc4',
    tapeType: 'center',
    delay: '660ms',
    bgColor: 'rgb(232, 216, 184)',
    pupLook: true,
  },
  {
    id: 6,
    caption: 'Gang of 3 😍🧸',
    image: '/puppies/family-6.jpg',
    tilt: '0.8deg',
    tape: '#f6d79a',
    tapeType: 'right',
    delay: '220ms',
    bgColor: 'rgb(184, 152, 120)',
  },
  {
    id: 7,
    caption: 'So happy 😍😍',
    image: '/puppies/family-7.jpg',
    tilt: '-2.6deg',
    tape: '#f9cdbf',
    tapeType: 'left',
    delay: '770ms',
    bgColor: 'rgb(88, 56, 56)',
  },
  {
    id: 8,
    caption: 'New pup 🤗💫',
    image: '/puppies/family-8.jpg',
    tilt: '1.2deg',
    tape: '#cfe5f6',
    tapeType: 'center',
    delay: '440ms',
    bgColor: 'rgb(24, 40, 72)',
  },
];

export const HappyFamiliesSection: React.FC = () => {
  const wallRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidItem | null>(null);

  useEffect(() => {
    const el = wallRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div data-section="families">
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-dusk"
        style={{
          '--sky-top': '#a65a30',
          '--sky-bottom': '#4d2b19',
        } as React.CSSProperties}
        aria-labelledby="dusk-title"
        data-here="false"
        data-visited="false"
      >
        {/* Top Dusk Sky Header & Client Testimonial Note */}
        <div className="tp-dusk__sky gutter">
          <div className="tp-dusk__head">
            <h2 id="dusk-title" className="font-plush text-huge text-white">
              Happy families &amp; puppies
            </h2>
            <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
              We are truly honored to see our puppies become cherished members of loving families. These heartwarming
              moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
            </p>
          </div>

          <figure className="tp-dusk__note">
            <blockquote className="font-plush-text">
              “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our
              Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process
              gave us complete peace of mind.”
            </blockquote>
            <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
          </figure>
        </div>

        {/* Photowall Wooden Shelf Wall */}
        <div className="tp-photowall" ref={wallRef}>
          <div className="tp-photowall__wall">
            <ul className="tp-photowall__prints" aria-label="Photos from TeddyPups families">
              {POLAROIDS.map((item, idx) => (
                <li
                  key={item.id}
                  data-reveal="true"
                  data-pup-look={item.pupLook ? '' : undefined}
                  style={{ '--d': item.delay } as React.CSSProperties}
                  data-armed="true"
                  data-revealed={revealed ? 'true' : 'false'}
                >
                  <button
                    type="button"
                    className="tp-photowall__print"
                    aria-label={`Open photo ${item.id} of 64: ${item.caption}`}
                    onClick={() => setSelectedPhoto(item)}
                  >
                    <span
                      className="tp-polaroid"
                      style={{
                        '--tilt': item.tilt,
                        '--tape': item.tape,
                        '--i': idx,
                      } as React.CSSProperties}
                    >
                      {/* Washi Tape */}
                      {item.tapeType === 'center' && <span aria-hidden="true" className="tp-tape tp-tape--center" />}
                      {item.tapeType === 'left' && <span aria-hidden="true" className="tp-tape tp-tape--left" />}
                      {item.tapeType === 'right' && <span aria-hidden="true" className="tp-tape tp-tape--right" />}
                      {item.tapeType === 'corners' && (
                        <>
                          <span aria-hidden="true" className="tp-tape tp-tape--tl" />
                          <span aria-hidden="true" className="tp-tape tp-tape--tr" />
                        </>
                      )}

                      {/* Polaroid Photo Frame */}
                      <span className="tp-polaroid__photo">
                        <img
                          alt="A happy TeddyPups family with their new puppy"
                          loading="lazy"
                          width="433"
                          height="433"
                          decoding="async"
                          style={{
                            color: 'transparent',
                            width: '100%',
                            height: 'auto',
                            backgroundColor: item.bgColor,
                          }}
                          src={item.image}
                        />
                      </span>

                      {/* Polaroid Handwritten Caption */}
                      <span className="tp-polaroid__caption font-scrawl">{item.caption}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Facade Ground with Door, Lamp, CTA, and Mascot */}
            <div className="tp-facade__ground">
              <span aria-hidden="true" className="tp-facade__door" />
              <span aria-hidden="true" className="tp-lamp">
                <span className="tp-lamp__light" />
              </span>
              <a className="btn btn-primary tp-facade__cta   px-7 py-3 text-base font-semibold shrink-0" href="/happy-families">
                See every happy family
              </a>
              <div data-pup-stop="true" data-pose="sit" data-facing="right" className="pup-stop tp-dusk__teddy">
                <PoodleMascot pose="sit" bubbleText="so happy! 🧸" />
              </div>
            </div>
          </div>

          {/* Cobblestone / Street Pavement Band */}
          <div aria-hidden="true" className="tp-street__pavement" />
        </div>

        {/* Photo Viewer Modal Dialog */}
        {selectedPhoto && (
          <dialog
            open
            aria-label="Photo viewer"
            className="fixed inset-0 z-50 flex items-center justify-center m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa/95 p-4 text-milk backdrop:bg-cocoa/70 outline-none"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-xl w-full bg-cream rounded-3xl p-6 border-4 border-cocoa text-cocoa shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cocoa text-cream flex items-center justify-center hover:scale-105 transition-transform"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo"
              >
                ✕
              </button>
              <div className="aspect-[4/4.6] w-full rounded-2xl overflow-hidden bg-cream-soft border-2 border-cocoa/20 mb-4">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-scrawl text-xl text-center text-cocoa font-bold">
                {selectedPhoto.caption}
              </p>
            </div>
          </dialog>
        )}
      </section>
    </div>
  );
};
