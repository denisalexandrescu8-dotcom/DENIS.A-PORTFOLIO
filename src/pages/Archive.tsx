import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ProjectShowcase } from '../components/ui/project-showcase';

export default function Archive() {
  const { content } = useLanguage();

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest mb-8">
            <ArrowLeft size={16} />
            {content.ui.backToHome}
          </Link>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            {content.archive.title} <span className="text-white/40 italic">{content.archive.titleHighlight}</span>
          </h1>
          <p className="text-white/60 text-lg font-light max-w-xl">
            {content.archive.subtitle}
          </p>
        </div>

        <ProjectShowcase projects={content.archive.projects} />
      </div>
    </section>
  );
}
