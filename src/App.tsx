/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import BackButton from './components/BackButton';
import { GradientBackground } from './components/ui/paper-design-shader-background';
import LoadingScreen from './components/LoadingScreen';

import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Archive from './pages/Archive';
import ProjectDetail from './pages/ProjectDetail';

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
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen key="loader" />}
        </AnimatePresence>
        
        <ScrollToTop />
        <ConditionalBackButton />
        <BackToTop />
        <main className="relative min-h-screen text-white selection:bg-premium-gold/30 transition-colors duration-300">
          <GradientBackground />
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <AnimatedRoutes />
          </div>
          <Footer />
        </main>
      </Router>
    </LanguageProvider>
  );
}

function ConditionalBackButton() {
  const location = useLocation();
  if (location.pathname === '/') return null;
  return <BackButton />;
}
