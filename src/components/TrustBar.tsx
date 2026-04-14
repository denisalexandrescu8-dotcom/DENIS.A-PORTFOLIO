import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function TrustBar() {
  const { content } = useLanguage();

  return (
    <section className="py-12 border-y border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-gray-900/50 overflow-hidden transition-colors duration-300 w-full">
      <div className="flex whitespace-nowrap w-full">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex items-center gap-16 pr-16 min-w-full"
        >
          {[...content.trustBrands, ...content.trustBrands].map((brand, i) => (
            <span 
              key={i} 
              className="text-2xl md:text-3xl font-display font-bold text-gray-400 dark:text-white/20 hover:text-gray-900 dark:hover:text-white/40 transition-colors cursor-default shrink-0"
            >
              {brand}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
