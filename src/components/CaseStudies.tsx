import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function CaseStudies() {
  const { content } = useLanguage();

  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              {content.caseStudies.sectionTitle} <span className="text-white/40 italic">{content.caseStudies.sectionTitleHighlight}</span>
            </h2>
            <p className="text-white/60 text-lg font-light">
              {content.caseStudies.sectionSubtitle}
            </p>
          </div>
          <Link to="/archive" className="text-sm font-mono uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all">
            {content.ui.viewArchive} ({content.archive.projects.length}+)
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {content.caseStudies.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              <Link to={`/project/${project.id}`} className="block relative aspect-[16/9] overflow-hidden rounded-3xl bg-dark-surface border border-white/5">
                {project.thumbnailGallery ? (
                  <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-1 p-1 bg-white/5">
                    {project.thumbnailGallery.slice(0, 4).map((img, i) => (
                      <img 
                        key={i}
                        src={img} 
                        alt={`${project.title} ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ))}
                  </div>
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/60 mb-2 block">
                      {project.category} — {project.client}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
