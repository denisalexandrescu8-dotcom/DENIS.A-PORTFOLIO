import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function TrustBar() {
  const { content } = useLanguage();

  return (
    <section className="py-12 bg-transparent overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm md:text-base font-mono uppercase tracking-widest text-white/60 font-light">
          {content.trustSectionHeadline}
        </p>
      </div>
      <div className="flex whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex items-center gap-16 pr-16"
        >
          {[...content.trustBrands, ...content.trustBrands, ...content.trustBrands, ...content.trustBrands].map((brand, i) => (
            <div 
              key={i} 
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/[0.02] text-xl md:text-2xl font-display font-semibold tracking-wider text-white/60 hover:text-white hover:border-premium-gold/40 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-premium-gold/60" />
              <span>{brand}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
