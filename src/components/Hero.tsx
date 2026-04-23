import { motion, Variants } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LiquidButton } from './ui/liquid-glass-button';

export default function Hero() {
  const { content } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.33, 1, 0.68, 1] // Ease out
      } 
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center pt-32 pb-20 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6"
      >
        <motion.div
          variants={itemVariants}
          className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-[0.2em] mb-8"
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
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          {content.hero.subheadline}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <LiquidButton 
            size="xxl"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group text-white font-bold uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              {content.ui.workWithMe}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </span>
          </LiquidButton>
          
          <LiquidButton 
            size="xxl"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/80 font-medium"
          >
            {content.ui.viewArchive}
          </LiquidButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
