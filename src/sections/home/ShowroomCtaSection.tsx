import React, { useEffect, useRef, useState } from 'react';

export const ShowroomCtaSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisited(true);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div data-section="cta">
      <section
        ref={sectionRef}
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-home"
        style={{
          '--sky-top': '#2f1a10',
          '--sky-bottom': '#24130b',
        } as React.CSSProperties}
        aria-labelledby="cta-title"
        data-here="true"
        data-visited={visited ? 'true' : 'false'}
      >
        {/* Header copy */}
        <div className="tp-home__copy gutter">
          <h2 id="cta-title" className="font-plush text-huge">
            Ready to meet your new best friend?
          </h2>
          <p className="tp-home__lede">
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you
            find the right match and ensure a smooth, safe delivery across the UAE.
          </p>
        </div>

        {/* 3D House Doorway with Plants, Lantern, Mat & Bowing Puppy */}
        <div className="tp-house">
          <span aria-hidden="true" className="tp-house__plant tp-house__plant--left" />
          <span aria-hidden="true" className="tp-house__lamp" />

          <div className="tp-house__doorway">
            <span className="tp-house__inside">
              <img
                alt="Max, waiting inside"
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  inset: '0px',
                  objectFit: 'cover',
                  objectPosition: '53.8% 44.3%',
                  color: 'transparent',
                  backgroundColor: 'rgb(120, 88, 56)',
                }}
                src="/puppies/max-waiting-inside.webp"
              />
            </span>
            <span
              aria-hidden="true"
              className="tp-house__door"
              style={{
                transform: visited ? 'rotateY(-102deg)' : 'rotateY(0deg)',
              }}
            >
              <span className="tp-house__peep" />
              <span className="tp-house__knob" />
            </span>
          </div>

          <span aria-hidden="true" className="tp-house__plant tp-house__plant--right" />
          <span aria-hidden="true" className="tp-house__mat font-scrawl">
            welcome home
          </span>
          <div
            id="pup-stop-cta"
            data-pup-stop="true"
            data-pose="bow"
            data-facing="right"
            className="pup-stop tp-house__teddy"
          />
        </div>

        {/* Action Buttons */}
        <div className="tp-home__actions gutter">
          <a
            href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp   px-7 py-3 text-base font-semibold shrink-0"
          >
            Enquire on WhatsApp
          </a>
          <a className="btn btn-ghost tp-home__ghost   px-7 py-3 text-base font-semibold shrink-0" href="/contact">
            Visit &amp; contact
          </a>
        </div>
      </section>
    </div>
  );
};
