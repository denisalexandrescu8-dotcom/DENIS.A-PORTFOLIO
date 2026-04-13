import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { content } = useLanguage();

  return (
    <section id="about" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10">
              <img 
                src={content.about.image} 
                alt={content.global.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-premium-blue/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -left-10 -translate-y-1/2 w-20 h-20 border border-white/10 rounded-full flex items-center justify-center text-[10px] font-mono uppercase tracking-widest rotate-90">
              {content.about.badge}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-premium-blue mb-6 block">{content.ui.theStory}</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              {content.about.headlineStart} <span className="text-white/40">{content.about.headlineHighlight1}</span>{content.about.headlineMiddle} <span className="text-white/40">{content.about.headlineHighlight2}</span>
            </h2>
            <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed">
              {content.about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
