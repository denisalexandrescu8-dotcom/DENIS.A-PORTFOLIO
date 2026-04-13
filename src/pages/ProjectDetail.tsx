import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, User, Briefcase, CheckCircle2 } from 'lucide-react';
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
    <section className="pt-32 pb-32 px-6 md:px-12 lg:px-24 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <Link to="/archive" className="inline-flex items-center gap-3 text-white/40 hover:text-premium-blue transition-all group text-sm font-mono uppercase tracking-widest">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-premium-blue/30 group-hover:bg-premium-blue/5 transition-all">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            {content.ui.backToArchive}
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
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-premium-blue mb-8">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-premium-blue/20 bg-premium-blue/5">
                <Calendar size={12} />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60">
                <Tag size={12} />
                <span>{project.category}</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[0.9] tracking-tighter">
              {project.project}
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col justify-end"
          >
            <div className="glass p-8 rounded-3xl border-white/5 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <User size={18} className="text-premium-blue" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">{content.ui.client}</div>
                  <div className="text-lg font-medium">{project.client}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Briefcase size={18} className="text-premium-blue" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">{content.ui.role}</div>
                  <div className="text-lg font-medium">{project.role}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-8">
            <div className="inline-block px-4 py-1 rounded-full border border-premium-blue/20 bg-premium-blue/5 text-[10px] font-mono uppercase tracking-widest text-premium-blue mb-8">
              {content.ui.projectOverview}
            </div>
            <p className="text-2xl md:text-3xl text-white/90 font-light leading-snug mb-12">
              {project.description}
            </p>
            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-6">{content.ui.theChallenge}</h3>
                <p className="text-white/60 leading-relaxed">
                  {content.ui.theChallengeDescription}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-6">{content.ui.theSolution}</h3>
                <p className="text-white/60 leading-relaxed">
                  {content.ui.theSolutionDescription}
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="glass p-10 rounded-[2rem] border-white/5 sticky top-32">
              <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-8">{content.ui.deliverables}</h3>
              <ul className="space-y-6">
                {project.deliverables.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-lg font-medium text-white/80"
                  >
                    <div className="w-6 h-6 rounded-full bg-premium-blue/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="text-premium-blue" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 1 && (
          <div className="space-y-12">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter">{content.ui.galleryShowcase} <span className="text-white/20">{content.ui.showcase}</span></h2>
              <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block" />
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
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
                    className={`relative break-inside-avoid w-full rounded-3xl overflow-hidden border border-white/10 bg-dark-surface flex items-center justify-center group hover:border-premium-blue/30 transition-all duration-500 shadow-xl ${isVideo ? 'aspect-video' : ''}`}
                  >
                    {isVideo ? (
                      <div className="w-full h-full aspect-video">
                        <iframe
                          src={imgSrc}
                          className="w-full h-full border-0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title={`${project.project} gallery video ${index + 1}`}
                        />
                      </div>
                    ) : (
                      <img 
                        src={imgSrc} 
                        alt={`${project.project} gallery image ${index + 2}`}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute inset-0 bg-premium-blue/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center text-center">
          <h3 className="text-xl text-white/40 mb-8 font-light italic">{content.ui.interested}</h3>
          <Link 
            to="/archive" 
            className="group relative px-12 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest overflow-hidden transition-all hover:pr-16"
          >
            <span className="relative z-10">{content.ui.exploreMore}</span>
            <ArrowLeft size={20} className="absolute right-8 top-1/2 -translate-y-1/2 rotate-180 opacity-0 group-hover:opacity-100 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}
