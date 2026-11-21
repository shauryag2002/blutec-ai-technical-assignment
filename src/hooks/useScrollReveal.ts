import { useEffect } from 'react';

/**
 * useScrollReveal Hook
 *
 * Discovers elements marked with `data-reveal="true"`.
 * Arms elements with `data-armed="true"`.
 * Uses a native, high-performance IntersectionObserver with passive detection to mark
 * elements as `data-revealed="true"` as they scroll into view.
 * 
 * Features:
 * - Staggered organic animations via CSS variables (--d)
 * - Instant reveal for above-the-fold content to optimize Core Web Vitals (LCP)
 * - WCAG Accessibility compliance: respects `prefers-reduced-motion: reduce`
 * - Automatically unobserves elements once revealed to minimize main-thread overhead (INP)
 */
export function useScrollReveal(dependencies: React.DependencyList = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check user preference for reduced motion (Accessibility)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal="true"]');

    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.setAttribute('data-armed', 'true');
        el.setAttribute('data-revealed', 'true');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.setAttribute('data-revealed', 'true');
            observer.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.05
      }
    );

    elements.forEach((el) => {
      el.setAttribute('data-armed', 'true');
      const rect = el.getBoundingClientRect();
      // If element is already visible in viewport, mark revealed immediately (improves LCP)
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.setAttribute('data-revealed', 'true');
      } else {
        el.removeAttribute('data-revealed');
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

