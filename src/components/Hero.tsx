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
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center pt-36 pb-20 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-6"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[1.02] md:leading-[0.95] tracking-tight mb-8 text-white"
        >
          {content.hero.h1}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          {content.hero.subheadline}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
        >
          <LiquidButton 
            size="xxl"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group text-white font-bold uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              {content.hero.primaryCta}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </span>
          </LiquidButton>
          
          <LiquidButton 
            size="xxl"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/80 font-medium"
          >
            {content.hero.secondaryCta}
          </LiquidButton>
        </motion.div>

        {content.hero.microcopy && (
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-sm font-mono text-white/60 tracking-wide"
          >
            {content.hero.microcopy}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
