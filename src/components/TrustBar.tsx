import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function TrustBar() {
  const { content } = useLanguage();

  return (
    <section className="py-12 border-y border-white/5 bg-dark-surface/50 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex items-center gap-16 pr-16"
        >
          {[...content.trustBrands, ...content.trustBrands].map((brand, i) => (
            <span 
              key={i} 
              className="text-2xl md:text-3xl font-display font-bold text-white/20 hover:text-white/40 transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
