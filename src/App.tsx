/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import BackButton from './components/BackButton';

const Home = lazy(() => import('./pages/Home'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Archive = lazy(() => import('./pages/Archive'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const basename = (import.meta as any).env.VITE_BASE_PATH || '/';

  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter basename={basename}>
          <ScrollToTop />
          <ConditionalBackButton />
          <BackToTop />
          <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-blue-500/30 px-4 md:px-8 transition-colors duration-300">
            <Navbar />
            <div className="max-w-7xl mx-auto">
              <AnimatedRoutes />
            </div>
            <Footer />
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
}

function ConditionalBackButton() {
  const location = useLocation();
  if (location.pathname === '/') return null;
  return <BackButton />;
}
