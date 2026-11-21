import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { StarryFooter } from './StarryFooter';
import { RouteTransition } from './RouteTransition';
import { PawTrailCanvas } from '../cursor/PawTrailCanvas';
import { GlobalPuppyActor } from '../mascot/GlobalPuppyActor';
import { useRouteTransition } from '../../hooks/useRouteTransition';
import { CONTACT_DETAILS } from '../../data/navigation';

/**
 * Main App Layout Component
 * 
 * Features:
 * - Sticky Navbar with scalloped bottom edge
 * - High performance canvas paw-step cursor trail on desktop
 * - RouteTransition curtain on page load/navigation
 * - Routed main view <Outlet />
 * - Mobile sticky bottom bar with "WhatsApp us" and "Call"
 * - StarryFooter
 */
export const Layout: React.FC = () => {
  const { isTransitioning } = useRouteTransition();

  return (
    <div className="min-h-screen flex flex-col bg-white text-espresso selection:bg-honey selection:text-espresso relative">
      {/* Delicate Paw Step Trail canvas behind pointer */}
      <PawTrailCanvas />

      {/* Sticky Global Navigation */}
      <Navbar />

      {/* Routed Page Content matching reference site */}
      <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] flex-grow outline-none">
        <Outlet />
      </main>

      {/* Mobile Sticky Bottom Bar (WhatsApp us & Call) */}
      <div
        data-whatsapp-bar="true"
        className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-cocoa bg-milk px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden"
      >
        <div className="mx-auto flex max-w-md gap-2">
          <a
            href={CONTACT_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp !min-h-12 flex-1 !shadow-none inline-flex items-center justify-center font-bold text-white rounded-full bg-[#1f7a4d] transition-transform"
          >
            WhatsApp us
          </a>
          <a
            href="tel:+971500000000"
            className="btn btn-ghost !min-h-12 !px-5 inline-flex items-center justify-center font-bold text-cocoa rounded-full border-2 border-cocoa bg-milk transition-colors"
          >
            Call
          </a>
        </div>
      </div>

      {/* Global Interactive Puppy Actor (Teddy) traveling between sections */}
      <GlobalPuppyActor />

      {/* Scalloped Curtain Preloader & Route Transition */}
      <RouteTransition isTransitioning={isTransitioning} />

      {/* Continuous Starry Night Footer */}
      <StarryFooter />
    </div>
  );
};
