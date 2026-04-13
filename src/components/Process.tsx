import { motion } from 'motion/react';

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your brand, goals, and target audience to find the unique angle.'
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Developing a visual roadmap that aligns creativity with your business objectives.'
  },
  {
    number: '03',
    title: 'Creation',
    description: 'The magic happens. High-fidelity design and editing with obsessive attention to detail.'
  },
  {
    number: '04',
    title: 'Optimization',
    description: 'Refining and testing to ensure the final output delivers maximum impact.'
  }
];

export default function Process() {
  return (
    <section id="process" className="section-padding bg-dark-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              The <span className="text-white/40 italic">Process</span>
            </h2>
            <p className="text-white/60 text-lg font-light">
              A structured approach to creativity that ensures consistency, quality, and results every single time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="text-6xl font-display font-extrabold text-white/5 mb-6 group-hover:text-premium-blue/20 transition-colors">
                {step.number}
              </div>
              <h3 className="text-xl font-display font-bold mb-4">{step.title}</h3>
              <p className="text-white/50 font-light leading-relaxed text-sm">
                {step.description}
              </p>
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-6 w-12 h-[1px] bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
