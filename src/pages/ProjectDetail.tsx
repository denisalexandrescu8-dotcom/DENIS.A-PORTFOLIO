import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, X, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LiquidButton } from '../components/ui/liquid-glass-button';
import SEO from '../components/SEO';

export default function ProjectDetail() {
  const { id } = useParams();
  const { content, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const project = content.archive.projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/archive" replace />;
  }

  const projectAny = project as any;
  const startingPoint = projectAny.startingPoint;
  const execution = projectAny.execution;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": `${project.project} - ${project.client}`,
    "headline": `${project.project}: ${project.category} para ${project.client}`,
    "image": project.image,
    "creator": {
      "@type": "Person",
      "name": "Denis Alexandrescu",
      "url": "https://denisalexandrescu.com"
    },
    "dateCreated": project.year,
    "genre": project.category,
    "description": project.description
  };

  return (
    <>
      <SEO
        title={`${project.project} (${project.client}) | Denis Alexandrescu`}
        description={`${project.description} Caso de estudio de ${project.category} por Denis Alexandrescu.`}
        image={project.image}
        url={`https://denisalexandrescu.com/project/${project.id}`}
        type="article"
        jsonLd={projectJsonLd}
      />

      <section className="pt-36 pb-32 px-6 md:px-12 lg:px-24 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Back */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-14"
          >
            <Link to="/archive" className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-all group text-xs font-mono uppercase tracking-widest">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-premium-gold/40 group-hover:bg-premium-gold/10 transition-all">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <span>{content.ui.backToArchive}</span>
            </Link>
          </motion.div>

          {/* Header Metadata: año · categoría */}
          <div className="text-xs font-mono uppercase tracking-widest text-premium-gold mb-6">
            {project.year} · {project.category}
          </div>

          {/* Project Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-[0.95] tracking-tight text-white">
            {project.project}
          </h1>

          {/* Project Subheading / Bajada */}
          <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mb-8">
            {project.description}
          </p>

          {/* Client & Role */}
          <div className="text-sm md:text-base text-white/70 font-mono mb-16 pb-8 border-b border-white/10">
            <span className="text-white font-medium">{content.ui.client}:</span> {project.client} · <span className="text-white font-medium">{content.ui.role}:</span> {project.role}
          </div>

          {/* Case Study Body: El punto de partida / Criterio y ejecución / Entregables */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-8 space-y-12">
              {startingPoint && (
                <div className="space-y-4">
                  <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-premium-gold font-semibold">
                    {language === 'es' ? 'EL PUNTO DE PARTIDA' : 'THE STARTING POINT'}
                  </h2>
                  <p className="text-white/80 leading-relaxed text-base md:text-lg font-light">
                    {startingPoint}
                  </p>
                </div>
              )}

              {execution && (
                <div className="space-y-4">
                  <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-premium-gold font-semibold">
                    {language === 'es' ? 'CRITERIO Y EJECUCIÓN' : 'CRITERIA AND EXECUTION'}
                  </h2>
                  <div className="space-y-4 text-white/80 leading-relaxed text-base md:text-lg font-light">
                    {Array.isArray(execution) ? (
                      execution.map((par: string, idx: number) => (
                        <p key={idx}>{par}</p>
                      ))
                    ) : (
                      <p>{execution}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-4">
              {project.deliverables && project.deliverables.length > 0 && (
                <div className="glass p-8 rounded-3xl border border-white/10 sticky top-32 space-y-6">
                  <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-premium-gold font-semibold">
                    {language === 'es' ? 'ENTREGABLES' : 'DELIVERABLES'}
                  </h3>
                  <ul className="space-y-3">
                    {project.deliverables.map((item, i) => (
                      <li 
                        key={i}
                        className="flex items-center gap-3 text-sm md:text-base font-medium text-white/90"
                      >
                        <div className="w-5 h-5 rounded-full bg-premium-gold/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={13} className="text-premium-gold" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Gallery Section */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-8 mb-24">
              <div className="columns-1 md:columns-2 gap-8 space-y-8">
                {project.gallery.map((imgSrc, index) => {
                  const isVideo = imgSrc.includes('/preview');
                  return (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className={`relative break-inside-avoid w-full rounded-3xl overflow-hidden border border-white/10 bg-dark-surface flex items-center justify-center group hover:border-premium-gold/40 transition-all duration-500 shadow-xl ${isVideo ? 'aspect-video' : 'cursor-pointer'}`}
                      onClick={() => !isVideo && setSelectedImage(imgSrc)}
                    >
                      {isVideo ? (
                        <div className="w-full h-full aspect-video">
                          <iframe
                            src={imgSrc}
                            className="w-full h-full border-0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            title={`${project.project} gallery video ${index + 1}`}
                          />
                        </div>
                      ) : (
                        <>
                          <img 
                            src={imgSrc} 
                            alt={`${project.project} - ${project.category} - ${index + 1}`}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="px-4 py-2 rounded-full bg-black/80 border border-white/20 text-xs font-mono text-white flex items-center gap-2">
                              <Maximize2 size={14} />
                              <span>{language === 'es' ? 'Ampliar' : 'Zoom'}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                onClick={() => setSelectedImage(null)}
              >
                <button
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Cerrar modal"
                >
                  <X size={24} />
                </button>
                <div className="max-w-6xl max-h-[90vh] overflow-auto flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                  <img
                    src={selectedImage}
                    alt={project.project}
                    className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bloque de cierre, común a todas las fichas */}
          <div className="pt-20 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                {content.projectDetailClosing.title}
              </h3>
              <p className="text-white/70 font-light text-base">
                {content.projectDetailClosing.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/#contact">
                <LiquidButton size="xl" className="text-white font-bold uppercase tracking-wider">
                  {content.projectDetailClosing.primaryCta}
                </LiquidButton>
              </Link>
              <Link to="/archive">
                <LiquidButton size="xl" className="text-white/70 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-2">
                    {content.projectDetailClosing.secondaryCta}
                    <ArrowLeft size={18} className="rotate-180" />
                  </span>
                </LiquidButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
