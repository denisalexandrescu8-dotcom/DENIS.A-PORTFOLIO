import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import CaseStudies from '../components/CaseStudies';
import Services from '../components/Services';
import Conditions from '../components/Conditions';
import About from '../components/About';
import Process from '../components/Process';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();

  return (
    <>
      <SEO
        url="https://denisalexandrescu.com"
      />
      <Hero />
      <TrustBar />
      <CaseStudies />
      <Services />
      <Conditions />
      <About />
      <Process />
      <FinalCTA />
    </>
  );
}
