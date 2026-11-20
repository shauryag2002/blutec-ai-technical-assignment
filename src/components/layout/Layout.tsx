import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { StarryFooter } from './StarryFooter';
import { RouteTransition } from './RouteTransition';
import { PawTrailCanvas } from '../cursor/PawTrailCanvas';
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
    <div className="min-h-screen flex flex-col bg-cream text-espresso selection:bg-honey selection:text-espresso relative">
      {/* Delicate Paw Step Trail canvas behind pointer */}
      <PawTrailCanvas />

      {/* Scalloped Curtain Preloader & Route Transition */}
      <RouteTransition isTransitioning={isTransitioning} />

      {/* Sticky Global Navigation */}
      <Navbar />

      {/* Routed Page Content */}
      <main id="main" className="flex-grow">
        <Outlet />
      </main>

      {/* Continuous Starry Night Footer */}
      <StarryFooter />
    </div>
  );
};
