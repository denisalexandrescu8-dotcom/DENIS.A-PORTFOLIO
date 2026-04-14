import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { content } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center pt-32 pb-20 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-blue/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-premium-gold/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6"
      >
        <motion.div
          variants={itemVariants}
          className="inline-block px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-xs font-mono uppercase tracking-[0.2em] mb-8"
        >
          {content.hero.availabilityBadge}
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.9] tracking-tighter mb-8"
        >
          {content.hero.headlineStart} <span className="text-gradient">{content.hero.headlineHighlight}</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 dark:text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          {content.hero.subheadline}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider overflow-hidden transition-all hover:pr-12"
          >
            <span className="relative z-10">{content.ui.workWithMe}</span>
            <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
          </button>
          <button 
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/5 transition-all text-gray-800 dark:text-white/80 font-medium"
          >
            {content.ui.viewArchive}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
