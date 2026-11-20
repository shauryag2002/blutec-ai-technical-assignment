import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { StarryFooter } from './StarryFooter';
import { RouteTransition } from './RouteTransition';
import { PawCursor } from '../cursor/PawCursor';
import { useRouteTransition } from '../../hooks/useRouteTransition';

/**
 * Main App Layout Component
 * 
 * Wraps Navbar, RouteTransitionCurtain, main page <Outlet />,
 * StarryFooter, and custom desktop PawCursor.
 */
export const Layout: React.FC = () => {
  const { isTransitioning } = useRouteTransition();

  return (
    <div className="min-h-screen flex flex-col bg-cream text-espresso selection:bg-honey selection:text-espresso relative">
      {/* Desktop Fine-Pointer Custom Paw Cursor */}
      <PawCursor />

      {/* Scalloped Curtain Page Transition */}
      <RouteTransition isTransitioning={isTransitioning} />

      {/* Global Navigation Bar */}
      <Navbar />

      {/* Routed Page Content */}
      <main id="main" className="flex-grow">
        <Outlet />
      </main>

      {/* Deep Espresso Starry Night Footer */}
      <StarryFooter />
    </div>
  );
};

