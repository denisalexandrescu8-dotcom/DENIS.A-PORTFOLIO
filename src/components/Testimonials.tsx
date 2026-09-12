import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { language } = useLanguage();

  const testimonials = language === 'es' ? [
    {
      name: "Fernando Hernández",
      role: "CEO & Emprendedor Digital",
      project: "Estrategia Visual & Edición de Vídeo",
      metric: "+250k visualizaciones orgánicas",
      content: "Denis entiende exactamente cómo transformar conceptos abstractos en contenido visual que engancha desde el primer segundo. Su trabajo en la edición y piezas gráficas elevó notablemente la retención y la autoridad de mi marca personal.",
      rating: 5,
    },
    {
      name: "Comité Organizador CONEF",
      role: "Congreso Nacional de Economía y Finanzas",
      project: "Identidad de Marca Completa 2025",
      metric: "100% consistencia de marca en evento",
      content: "Desarrollar la identidad de un congreso nacional desde cero exigía un nivel de rigor y criterio estético impecable. Denis creó un sistema visual coherente, moderno y versátil que funcionó a la perfección tanto en soportes impresos como en pantallas de gran formato.",
      rating: 5,
    },
    {
      name: "Anna",
      role: "Fundadora, Anna Language Coaching",
      project: "Diseño de Marca & Logotipo",
      metric: "Lanzamiento de marca exitoso",
      content: "Buscaba una identidad que comunicara profesionalidad pero a la vez cercanía pedagógica. El proceso creativo con Denis fue fluido y el resultado final superó mis expectativas. Mis clientes destacan de inmediato el diseño del logo.",
      rating: 5,
    }
  ] : [
    {
      name: "Fernando Hernández",
      role: "CEO & Digital Entrepreneur",
      project: "Visual Strategy & Video Editing",
      metric: "+250k organic impressions",
      content: "Denis understands exactly how to turn abstract ideas into engaging visual content right from the first second. His editing and graphic pieces significantly boosted our viewer retention and personal brand authority.",
      rating: 5,
    },
    {
      name: "CONEF Organizing Committee",
      role: "National Economics & Finance Congress",
      project: "Complete Brand Identity 2025",
      metric: "100% brand consistency across venue",
      content: "Creating a national congress identity from scratch required strict precision and flawless aesthetic judgment. Denis delivered a coherent, modern, and versatile design system that looked stunning across print and stage screens.",
      rating: 5,
    },
    {
      name: "Anna",
      role: "Founder, Anna Language Coaching",
      project: "Brand Identity & Logo Design",
      metric: "Successful brand rollout",
      content: "I needed an identity that felt deeply professional yet friendly and accessible. Working with Denis was effortless and the final identity exceeded my expectations. Clients immediately compliment my brand look.",
      rating: 5,
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-premium-gold mb-4 inline-block">
              {language === 'es' ? 'Testimonios & Confianza' : 'Social Proof & Trust'}
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
              {language === 'es' ? 'Lo que dicen quienes' : 'What clients say after'}{' '}
              <span className="text-white/40">{language === 'es' ? 'trabajan conmigo' : 'working with me'}</span>
            </h2>
            <p className="text-lg text-white/70 font-light leading-relaxed">
              {language === 'es'
                ? 'Resultados reales, comunicación directa y relaciones a largo plazo con marcas y creadores.'
                : 'Real results, direct communication, and long-term partnerships with leading brands and creators.'}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-premium-gold/30 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-premium-gold">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={24} className="text-white/20 group-hover:text-premium-gold/40 transition-colors" />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-premium-gold/10 border border-premium-gold/20 text-premium-gold text-xs font-mono mb-6">
                  <CheckCircle2 size={12} />
                  <span>{item.metric}</span>
                </div>

                <p className="text-white/80 font-light leading-relaxed mb-8 text-base">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="font-display font-bold text-lg text-white group-hover:text-premium-gold transition-colors">
                  {item.name}
                </div>
                <div className="text-xs text-white/60 font-mono mt-1">
                  {item.role}
                </div>
                <div className="text-[11px] text-white/40 font-mono mt-0.5">
                  {item.project}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
