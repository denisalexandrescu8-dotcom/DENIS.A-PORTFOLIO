import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { CheckCircle2 } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="section-padding bg-dark-surface/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Creative <span className="text-white/40 italic">Solutions</span>
          </h2>
          <p className="text-white/60 text-lg font-light">
            I don't just design; I build visual systems that solve business problems and drive attention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-10 rounded-[2rem] hover:border-white/20 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-premium-blue/20 group-hover:text-premium-blue transition-colors">
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
              <p className="text-white/50 mb-8 font-light leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-3">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle2 size={16} className="text-premium-blue" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
