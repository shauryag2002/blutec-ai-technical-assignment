import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { StarryFooter } from './StarryFooter';
import { RouteTransition } from './RouteTransition';
import { PawTrailCanvas } from '../cursor/PawTrailCanvas';
import { GlobalPuppyActor } from '../mascot/GlobalPuppyActor';
import { useRouteTransition } from '../../hooks/useRouteTransition';

/**
 * Main App Layout Component
 * 
 * Features:
 * - Sticky Navbar with scalloped bottom edge
 * - High performance canvas paw-step cursor trail on desktop
 * - RouteTransition curtain on page load/navigation
 * - Routed main view <Outlet />
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

      {/* Global Interactive Puppy Actor (Teddy) traveling between sections */}
      <GlobalPuppyActor />

      {/* Scalloped Curtain Preloader & Route Transition */}
      <RouteTransition isTransitioning={isTransitioning} />

      {/* Continuous Starry Night Footer */}
      <StarryFooter />
    </div>
  );
};
