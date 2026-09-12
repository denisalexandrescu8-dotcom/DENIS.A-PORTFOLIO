import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, User, Briefcase, CheckCircle2, Award, Zap, X, Maximize2, MessageSquare } from 'lucide-react';
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
  const challengeText = projectAny.challenge || content.ui.theChallengeDescription;
  const solutionText = projectAny.solution || content.ui.theSolutionDescription;
  const impactText = projectAny.impact;

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

      <section className="pt-32 pb-32 px-6 md:px-12 lg:px-24 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Back */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-16"
          >
            <Link to="/archive" className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-all group text-sm font-mono uppercase tracking-widest">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-premium-gold/40 group-hover:bg-premium-gold/10 transition-all">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <span>{content.ui.backToArchive}</span>
            </Link>
          </motion.div>

          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-premium-gold mb-8">
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full border border-premium-gold/30 bg-premium-gold/10">
                  <Calendar size={13} />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 text-white/80">
                  <Tag size={13} />
                  <span>{project.category}</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[0.9] tracking-tight text-white">
                {project.project}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 flex flex-col justify-end"
            >
              <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <User size={18} className="text-premium-gold" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-white/60 mb-1">{content.ui.client}</div>
                    <div className="text-lg font-medium text-white">{project.client}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Briefcase size={18} className="text-premium-gold" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-white/60 mb-1">{content.ui.role}</div>
                    <div className="text-lg font-medium text-white">{project.role}</div>
                  </div>
                </div>

                {impactText && (
                  <div className="pt-4 border-t border-white/10 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-premium-gold/10 flex items-center justify-center shrink-0 border border-premium-gold/20">
                      <Zap size={18} className="text-premium-gold" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-premium-gold mb-1">
                        {language === 'es' ? 'Impacto Clave' : 'Key Impact'}
                      </div>
                      <div className="text-sm font-medium text-white/90">{impactText}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-28">
            <div className="lg:col-span-8 space-y-12">
              <div className="inline-block px-4 py-1.5 rounded-full border border-premium-gold/30 bg-premium-gold/10 text-xs font-mono uppercase tracking-widest text-premium-gold">
                {content.ui.projectOverview}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                  <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-premium-gold mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-premium-gold" />
                    {content.ui.theChallenge}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-base font-light">
                    {challengeText}
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                  <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-premium-gold mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-premium-gold" />
                    {content.ui.theSolution}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-base font-light">
                    {solutionText}
                  </p>
                </div>
              </div>

              {impactText && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-premium-gold/15 via-premium-gold/5 to-transparent border border-premium-gold/30 flex items-center gap-4">
                  <Award className="text-premium-gold shrink-0" size={28} />
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-premium-gold mb-0.5">
                      {language === 'es' ? 'Resultado & Métrica Destacada' : 'Highlighted Metric & Result'}
                    </div>
                    <div className="text-base font-medium text-white">{impactText}</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-4">
              <div className="glass p-8 rounded-3xl border border-white/10 sticky top-32 space-y-6">
                <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-white/70 font-semibold">{content.ui.deliverables}</h3>
                <ul className="space-y-4">
                  {project.deliverables.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3 text-base font-medium text-white/90"
                    >
                      <div className="w-5 h-5 rounded-full bg-premium-gold/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={13} className="text-premium-gold" />
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-white/10">
                  <Link to="/#contact">
                    <LiquidButton size="lg" className="w-full text-white font-bold uppercase tracking-wider text-xs">
                      <span className="flex items-center justify-center gap-2">
                        <MessageSquare size={14} />
                        {language === 'es' ? 'Consultar Proyecto Similar' : 'Inquire Similar Project'}
                      </span>
                    </LiquidButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-12">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white">
                  {content.ui.galleryShowcase} <span className="text-white/30">{content.ui.showcase}</span>
                </h2>
                <div className="h-px flex-1 bg-white/10 mx-8 hidden md:block" />
                <div className="text-xs font-mono uppercase tracking-widest text-white/60">
                  {project.gallery.length} {project.gallery.length === 1 ? content.ui.asset : content.ui.assets}
                </div>
              </div>
              
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
                            alt={`${project.project} - ${project.category} - visual asset ${index + 1}`}
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

          {/* Footer Navigation */}
          <div className="mt-32 pt-20 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                {language === 'es' ? '¿Listo para elevar tu proyecto?' : 'Ready to elevate your brand?'}
              </h3>
              <p className="text-white/70 font-light">
                {language === 'es' ? 'Hablemos de tus objetivos y planifiquemos el siguiente paso.' : 'Let us discuss your goals and map out the next step.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/#contact">
                <LiquidButton size="xl" className="text-white font-bold uppercase tracking-wider">
                  {content.ui.contact}
                </LiquidButton>
              </Link>
              <Link to="/archive">
                <LiquidButton size="xl" className="text-white/70 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-2">
                    {content.ui.exploreMore}
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
