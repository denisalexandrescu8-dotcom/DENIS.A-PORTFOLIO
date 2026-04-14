/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Archive from './pages/Archive';
import ProjectDetail from './pages/ProjectDetail';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import BackButton from './components/BackButton';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  // Use the base path from Vite environment variables for GitHub Pages support
  const basename = (import.meta as any).env.VITE_BASE_PATH || '/';

  return (
    <LanguageProvider>
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <BackButton />
        <BackToTop />
        <main className="min-h-screen bg-black selection:bg-premium-blue/30">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </LanguageProvider>
  );
}
