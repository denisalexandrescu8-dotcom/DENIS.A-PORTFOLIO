/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import CaseStudies from './components/CaseStudies';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="min-h-screen bg-black selection:bg-premium-blue/30">
      <Navbar />
      <Hero />
      <TrustBar />
      <CaseStudies />
      <Services />
      <About />
      <Process />
      <FinalCTA />
      <Footer />
    </main>
  );
}
