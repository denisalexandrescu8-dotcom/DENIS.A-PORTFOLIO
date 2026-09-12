import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Clock, ShieldCheck, UserCheck, CreditCard } from 'lucide-react';

const icons = [Clock, ShieldCheck, UserCheck, CreditCard];

export default function Conditions() {
  const { content } = useLanguage();

  return (
    <section id="conditions" className="section-padding relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
            {content.conditions.sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.conditions.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-8 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-premium-gold shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-light leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
