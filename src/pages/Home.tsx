import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import CaseStudies from '../components/CaseStudies';
import Services from '../components/Services';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Process from '../components/Process';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Denis Alexandrescu",
    "url": "https://denisalexandrescu.com",
    "jobTitle": "Diseñador Gráfico y Creador Audiovisual",
    "image": "https://lh3.googleusercontent.com/d/1zi-oBDk1WAng22OjJt89mlLCt3odwkEC",
    "description": "Diseñador gráfico y creador audiovisual especializado en branding, motion graphics, edición de vídeo cinematográfica y contenido digital de alto impacto para marcas.",
    "knowsAbout": [
      "Diseño gráfico",
      "Branding e identidad visual",
      "Edición de vídeo cinematográfica",
      "Motion graphics",
      "Estrategia de contenido en redes sociales",
      "Miniaturas de YouTube de alta conversión"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Diseño y Contenido",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Diseño de Marca & Identidad Visual" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Edición de Vídeo & Motion Graphics" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Contenido para Redes Sociales & Reels" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Estrategia Creativa" } }
      ]
    }
  };

  return (
    <>
      <SEO
        title={language === 'es' ? "Denis Alexandrescu | Diseño Gráfico, Edición de Vídeo & Branding" : "Denis Alexandrescu | Graphic Design, Video Editing & Brand Strategy"}
        description={language === 'es' 
          ? "Portfolio profesional de Denis Alexandrescu. Diseño gráfico de alta conversión, edición de vídeo cinematográfica y creación de contenido para marcas y creadores en España e internacional." 
          : "Professional portfolio of Denis Alexandrescu. High-conversion graphic design, cinematic video editing, and digital content creation for leading brands and creators."}
        url="https://denisalexandrescu.com"
        jsonLd={jsonLd}
      />
      <Hero />
      <TrustBar />
      <CaseStudies />
      <Services />
      <About />
      <Testimonials />
      <Process />
      <FinalCTA />
    </>
  );
}
