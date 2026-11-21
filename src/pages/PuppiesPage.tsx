import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { PUPPIES } from '../data/puppies';
import { PoodleMascot } from '../components/mascot/PoodleMascot';
import { SKETCH_GEOMETRIES, GONE_HOME_PUPPIES } from '../data/sketchbookData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const PuppiesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [whereFilter, setWhereFilter] = useState<'all' | 'imported' | 'korean-teacup'>('all');
  const [breedFilter, setBreedFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'boy' | 'girl'>('all');

  const filteredPuppies = useMemo(() => {
    return PUPPIES.filter((pup) => {
      // 1. Where filter
      if (whereFilter === 'korean-teacup') {
        if (pup.collection !== 'korean-teacup') return false;
      }
      // 'imported' matches all imported bloodlines

      // 2. Breed filter
      if (breedFilter !== 'all') {
        const breedNormalized = breedFilter.toLowerCase().replace(/[^a-z]/g, '');
        const pupBreedNormalized = pup.breed.toLowerCase().replace(/[^a-z]/g, '');
        const pupTypeNormalized = (pup.breedType || '').toLowerCase().replace(/[^a-z]/g, '');
        if (
          !pupBreedNormalized.includes(breedNormalized) &&
          !pupTypeNormalized.includes(breedNormalized)
        ) {
          return false;
        }
      }

      // 3. Gender filter
      if (genderFilter !== 'all') {
        if (pup.gender.toLowerCase() !== genderFilter) return false;
      }

      return true;
    });
  }, [whereFilter, breedFilter, genderFilter]);

  const isDefaultFilters = whereFilter === 'all' && breedFilter === 'all' && genderFilter === 'all';

  // Native, high-performance scroll reveal observer with reduced motion support
  useScrollReveal([filteredPuppies.length, whereFilter, breedFilter, genderFilter]);

  return (
    <div data-page="pups" className="tp-page">
      <SEO
        title="Available puppies | TeddyPups U.A.E."
        description="Teacup and teddy bear puppies available now in Dubai and imported from trusted breeders — every listing shows real photos of the puppy."
        canonical="https://puppy.instabizweb.com/puppies"
      />
      <section aria-labelledby="pups-title" className="tp-sketchbook">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Sketchbook Header */}
          <div className="tp-sketchbook__head">
            <div className="tp-sketchbook__words">
              <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                from Teddy&apos;s sketchbook
              </p>
              <h1 id="pups-title" className="font-plush text-giant tp-sketchbook__title" data-reveal="true">
                Available puppies
                <svg aria-hidden="true" viewBox="0 0 400 24" preserveAspectRatio="none" className="tp-sketchbook__underline">
                  <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" pathLength="1" />
                </svg>
              </h1>
              <p className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft" data-reveal="true">
                Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
              </p>
            </div>

            {/* Teddy's Self Portrait Mascot Card */}
            <div className="tp-sketchbook__self" data-reveal="true">
              <div className="pup-buddy w-full h-full flex items-center justify-center" data-live="" data-facing="left">
                <PoodleMascot pose="sit" className="w-full h-full" />
              </div>
              <span className="tp-sketchbook__caption font-scrawl">me! 🧸</span>
            </div>
          </div>

          {/* Interactive Filter Pad (Taped Note Style) */}
          <div className="mt-12">
            <div>
              <div role="group" aria-label="Filter puppies" className="tp-sketchpad flex flex-col gap-4">
                {/* Where Filter Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">where</span>
                  <button
                    type="button"
                    aria-pressed={whereFilter === 'all'}
                    onClick={() => setWhereFilter('all')}
                    className="tp-sticker-chip"
                  >
                    Everywhere
                  </button>
                  <button
                    type="button"
                    aria-pressed={whereFilter === 'imported'}
                    onClick={() => setWhereFilter(whereFilter === 'imported' ? 'all' : 'imported')}
                    className="tp-sticker-chip"
                  >
                    Imported
                  </button>
                  <button
                    type="button"
                    aria-pressed={whereFilter === 'korean-teacup'}
                    onClick={() => setWhereFilter(whereFilter === 'korean-teacup' ? 'all' : 'korean-teacup')}
                    className="tp-sticker-chip"
                  >
                    Korean Teacup
                  </button>
                </div>

                {/* Breed Filter Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">breed</span>
                  {[
                    { label: 'Maltipoo', val: 'maltipoo' },
                    { label: 'Pomeranian', val: 'pomeranian' },
                    { label: 'Poodle', val: 'poodle' },
                    { label: 'Cavapoo', val: 'cavapoo' },
                    { label: 'Shih Tzu', val: 'shih tzu' }
                  ].map((b) => (
                    <button
                      key={b.val}
                      type="button"
                      aria-pressed={breedFilter === b.val}
                      onClick={() => setBreedFilter(breedFilter === b.val ? 'all' : b.val)}
                      className="tp-sticker-chip"
                    >
                      {b.label}
                    </button>
                  ))}
                </div>

                {/* Gender Filter Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">boy or girl</span>
                  <button
                    type="button"
                    aria-pressed={genderFilter === 'boy'}
                    onClick={() => setGenderFilter(genderFilter === 'boy' ? 'all' : 'boy')}
                    className="tp-sticker-chip"
                  >
                    Boys
                  </button>
                  <button
                    type="button"
                    aria-pressed={genderFilter === 'girl'}
                    onClick={() => setGenderFilter(genderFilter === 'girl' ? 'all' : 'girl')}
                    className="tp-sticker-chip"
                  >
                    Girls
                  </button>
                </div>
              </div>

              {/* Live Count Announcer */}
              <p className="font-scrawl mt-10 text-lg text-[var(--ink-soft)]" aria-live="polite">
                {isDefaultFilters
                  ? `${filteredPuppies.length} puppies looking for a home`
                  : `${filteredPuppies.length} ${filteredPuppies.length === 1 ? 'puppy matches' : 'puppies match'}`}
              </p>

              {/* Puppy Sketchbook Cards Grid */}
              <ul className="tp-sketches mt-8">
                {filteredPuppies.map((pup, idx) => {
                  const geom = SKETCH_GEOMETRIES[pup.slug] || {
                    tilt: '0deg',
                    washColor: '#f2be6b',
                    washTranslate: '0 0',
                    washPath: '',
                    mask: '',
                    inkLines: [],
                    doodles: []
                  };

                  return (
                    <li key={pup.slug} style={{ opacity: 1, transform: 'none' }}>
                      <Link
                        className="tp-sketch focus-visible:ring-2 focus-visible:ring-toffee focus-visible:ring-offset-4"
                        data-reveal="true"
                        aria-label={`${pup.name}, ${pup.breed}, ${pup.gender}, ${pup.age}, available`}
                        to={`/puppies/${pup.slug}`}
                        style={{
                          '--tilt': geom.tilt,
                          '--wash': geom.washColor,
                          '--d': `${(idx % 6) * 70}ms`
                        } as React.CSSProperties}
                      >
                        <span className="tp-sketch__frame">
                          {/* Organic Watercolor Wash Background */}
                          {geom.washPath && (
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 100 100"
                              className="tp-sketch__wash"
                              style={{ translate: geom.washTranslate }}
                            >
                              <path d={geom.washPath} />
                            </svg>
                          )}

                          {/* Blob Masked Photo */}
                          <span
                            className="tp-sketch__photo"
                            style={geom.mask ? { maskImage: `url("${geom.mask}")` } : undefined}
                          >
                            <img
                              alt=""
                              loading={idx < 2 ? 'eager' : 'lazy'}
                              fetchPriority={idx === 0 ? 'high' : 'auto'}
                              decoding="async"
                              src={pup.image}
                              width={300}
                              height={300}
                              style={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                                inset: '0px',
                                objectFit: 'cover'
                              }}
                            />
                          </span>

                          {/* Organic Ink Lines & Retraces */}
                          {geom.inkLines.length > 0 && (
                            <svg aria-hidden="true" viewBox="0 0 100 100" className="tp-sketch__ink">
                              {geom.inkLines.map((line, lIdx) => (
                                <path
                                  key={lIdx}
                                  d={line.d}
                                  pathLength="1"
                                  className={`tp-sketch__line ${line.retrace ? 'tp-sketch__line--retrace' : ''}`}
                                />
                              ))}
                              {geom.doodles.map((doodle, dIdx) => (
                                <g key={dIdx} transform={doodle.transform}>
                                  <g
                                    className="tp-sketch__doodle"
                                    dangerouslySetInnerHTML={{ __html: doodle.svg }}
                                  />
                                </g>
                              ))}
                            </svg>
                          )}

                          {/* Hand-lettered Status Sticker */}
                          <span className="tp-sketch__sticker font-scrawl">Available</span>

                          {/* Video Badge */}
                          {pup.hasVideo && (
                            <span className="tp-sketch__video">▶ video</span>
                          )}
                        </span>

                        {/* Title & Metadata */}
                        <span className="tp-sketch__name font-plush">{pup.name}</span>
                        <span className="tp-sketch__meta">
                          {pup.breed} · {pup.gender} · {pup.age}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Already Gone Home Strip Section */}
      <section aria-labelledby="gone-title" className="tp-gone-strip">
        <div className="gutter mx-auto flex max-w-[110rem] flex-col gap-10 md:flex-row md:items-center">
          <div className="md:w-1/3" data-reveal="true">
            <h2 id="gone-title" className="font-plush text-big">
              Already gone home
            </h2>
            <p className="mt-3 text-cocoa-soft">These puppies have found their families.</p>
            <Link className="btn btn-primary mt-6 px-7 py-3 text-base font-semibold shrink-0" to="/gone-home">
              See the puppies who&apos;ve gone home
            </Link>
          </div>

          <ul className="tp-gone-strip__row" aria-label="Some puppies who have gone home">
            {GONE_HOME_PUPPIES.map((gp, gIdx) => (
              <li key={gp.slug}>
                <Link
                  className="tp-sketch tp-sketch--small focus-visible:ring-2 focus-visible:ring-toffee"
                  data-reveal="true"
                  aria-label={gp.ariaLabel || `${gp.name}, gone home`}
                  to={`/puppies/${gp.slug}`}
                  style={{
                    '--tilt': gp.tilt,
                    '--wash': gp.washColor,
                    '--d': `${gIdx * 70}ms`
                  } as React.CSSProperties}
                >
                  <span className="tp-sketch__frame">
                    {gp.washPath && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 100 100"
                        className="tp-sketch__wash"
                        style={{ translate: gp.washTranslate }}
                      >
                        <path d={gp.washPath} />
                      </svg>
                    )}
                    <span
                      className="tp-sketch__photo"
                      style={gp.mask ? { maskImage: `url("${gp.mask}")` } : undefined}
                    >
                      <img
                        alt=""
                        loading="lazy"
                        decoding="async"
                        src={gp.img}
                        style={{
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                          inset: '0px',
                          objectFit: 'cover'
                        }}
                      />
                    </span>

                    {/* Organic Ink Lines & Retraces */}
                    {gp.inkLines && gp.inkLines.length > 0 && (
                      <svg aria-hidden="true" viewBox="0 0 100 100" className="tp-sketch__ink">
                        {gp.inkLines.map((line, lIdx) => (
                          <path
                            key={lIdx}
                            d={line.d}
                            pathLength="1"
                            className={`tp-sketch__line ${line.retrace ? 'tp-sketch__line--retrace' : ''}`}
                          />
                        ))}
                        {gp.doodles && gp.doodles.map((doodle, dIdx) => (
                          <g key={dIdx} transform={doodle.transform}>
                            <g
                              className="tp-sketch__doodle"
                              dangerouslySetInnerHTML={{ __html: doodle.svg }}
                            />
                          </g>
                        ))}
                      </svg>
                    )}

                    <span className="tp-sketch__sticker tp-sketch__sticker--home font-scrawl">
                      gone home ♥
                    </span>
                  </span>
                  <span className="tp-sketch__name font-plush">{gp.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
