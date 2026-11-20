import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { PuppiesPage } from './pages/PuppiesPage';
import { PuppyDetailPage } from './pages/PuppyDetailPage';
import { HappyFamiliesPage } from './pages/HappyFamiliesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { GoneHomePage } from './pages/GoneHomePage';

/**
 * App Root Component
 * 
 * Sets up client-side SPA routing with React Router v6.
 * All views are nested inside the storybook Layout (Navbar + Curtain + StarryFooter).
 */
export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="puppies" element={<PuppiesPage />} />
          <Route path="puppies/:slug" element={<PuppyDetailPage />} />
          <Route path="happy-families" element={<HappyFamiliesPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="gone-home" element={<GoneHomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
