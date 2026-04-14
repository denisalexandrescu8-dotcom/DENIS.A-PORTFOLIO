import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function TrustBar() {
  const { content } = useLanguage();

  return (
    <section className="py-12 bg-transparent overflow-hidden transition-colors duration-300 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex whitespace-nowrap">
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
            <span 
              key={i} 
              className="text-2xl md:text-3xl font-display font-bold text-gray-400 dark:text-white/20 hover:text-gray-900 dark:hover:text-white/40 transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
