import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import CaseStudies from '../components/CaseStudies';
import Services from '../components/Services';
import About from '../components/About';
import Process from '../components/Process';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CaseStudies />
      <Services />
      <About />
      <Process />
      <FinalCTA />
    </>
  );
}
