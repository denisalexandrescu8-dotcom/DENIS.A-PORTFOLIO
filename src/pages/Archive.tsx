import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ProjectShowcase } from '../components/ui/project-showcase';
import SEO from '../components/SEO';

export default function Archive() {
  const { content, language } = useLanguage();

  return (
    <>
      <SEO
        title={language === 'es' ? "Archivo de Trabajos & Casos de Estudio | Denis Alexandrescu" : "Selected Archive & Case Studies | Denis Alexandrescu"}
        description={language === 'es'
          ? "Explora el archivo completo de proyectos de diseño gráfico, identidades de marca, edición audiovisual y contenido digital por Denis Alexandrescu."
          : "Explore the complete archive of graphic design, brand identities, video editing, and digital content projects by Denis Alexandrescu."}
        url="https://denisalexandrescu.com/archive"
      />
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest mb-8">
              <ArrowLeft size={16} />
              {content.ui.backToHome}
            </Link>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
              {content.archive.title} <span className="text-white/40 italic">{content.archive.titleHighlight}</span>
            </h1>
            <p className="text-white/80 text-lg font-light max-w-2xl leading-relaxed">
              {content.archive.subtitle}
            </p>
          </div>

          <ProjectShowcase projects={content.archive.projects} />
        </div>
      </section>
    </>
  );
}
