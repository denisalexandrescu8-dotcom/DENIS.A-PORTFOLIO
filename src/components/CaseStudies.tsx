import { motion } from 'motion/react';
import { CASE_STUDIES } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export default function CaseStudies() {
  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Selected <span className="text-white/40 italic">Projects</span>
            </h2>
            <p className="text-white/60 text-lg font-light">
              A collection of work focused on measurable impact, visual storytelling, and brand elevation.
            </p>
          </div>
          <button className="text-sm font-mono uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all">
            View Archive (24+)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {CASE_STUDIES.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative ${index === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-dark-surface border border-white/5">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* Impact Badge */}
                <div className="absolute top-6 right-6 glass px-4 py-2 rounded-full text-xs font-bold tracking-wider text-premium-gold">
                  {project.impact}
                </div>

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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
