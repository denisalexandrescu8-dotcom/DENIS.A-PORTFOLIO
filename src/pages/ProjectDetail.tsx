import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { content } = useLanguage();
  const project = content.archive.projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/archive" replace />;
  }

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <Link to="/archive" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest mb-12">
          <ArrowLeft size={16} />
          {content.ui.backToArchive}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-premium-blue mb-6">
              <span>{project.year}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{project.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              {project.project}
            </h1>
            <p className="text-xl text-white/60 font-light max-w-2xl">
              {project.description}
            </p>
          </div>

          <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 mb-16 bg-dark-surface flex items-center justify-center shadow-2xl">
            {project.image.includes('/preview') ? (
              <iframe
                src={project.image}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <img 
                src={project.image} 
                alt={project.project}
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2">
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-premium-blue mb-6">Overview</h2>
              <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="space-y-10 border-l border-white/5 pl-8 md:pl-12">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">{content.ui.client}</div>
                <div className="text-xl font-medium">{project.client}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">{content.ui.role}</div>
                <div className="text-xl font-medium">{project.role}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">{content.ui.deliverables}</div>
                <ul className="space-y-2">
                  {project.deliverables.map((item, i) => (
                    <li key={i} className="text-lg font-medium text-white/80 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-premium-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {project.gallery && project.gallery.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {project.gallery.slice(1).map((imgSrc, index) => {
                const isVideo = imgSrc.includes('/preview');
                return (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`w-full ${isVideo ? 'md:col-span-2 aspect-video' : 'aspect-square'} rounded-3xl overflow-hidden border border-white/10 bg-dark-surface flex items-center justify-center p-4 group hover:border-white/20 transition-colors`}
                  >
                    {isVideo ? (
                      <iframe
                        src={imgSrc}
                        className="w-full h-full border-0 rounded-2xl"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    ) : (
                      <img 
                        src={imgSrc} 
                        alt={`${project.project} gallery image ${index + 2}`}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
