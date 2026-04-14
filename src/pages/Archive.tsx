import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

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

        <div className="border-t border-white/10">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-4 gap-4 py-4 px-4 text-xs font-mono uppercase tracking-widest text-white/40 border-b border-white/10">
            <div>{content.ui.year}</div>
            <div>{content.ui.project}</div>
            <div>{content.ui.client}</div>
            <div>{content.ui.category}</div>
          </div>

          {/* Table Body */}
          {content.archive.projects.map((item, i) => (
            <Link to={`/project/${item.id}`} key={item.id || i}>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 py-6 px-4 border-b border-white/10 hover:bg-white/5 transition-colors items-center group cursor-pointer"
              >
                <div className="text-white/40 font-mono text-sm">{item.year}</div>
                <div className="font-bold text-lg md:text-xl group-hover:text-premium-blue transition-colors flex items-center gap-3">
                  {item.project}
                  <ArrowUpRight size={16} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </div>
                <div className="text-white/60">{item.client}</div>
                <div className="text-premium-blue/70 text-sm">{item.category}</div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
