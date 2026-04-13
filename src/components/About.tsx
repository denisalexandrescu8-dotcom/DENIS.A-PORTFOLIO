import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10">
              <img 
                src="https://picsum.photos/seed/denis/800/1000" 
                alt="Denis Alexandrescu"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-premium-blue/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -left-10 -translate-y-1/2 w-20 h-20 border border-white/10 rounded-full flex items-center justify-center text-[10px] font-mono uppercase tracking-widest rotate-90">
              Creative Strategist
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-premium-blue mb-6 block">The Story</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Obsessed with <span className="text-white/40">Quality</span>, Driven by <span className="text-white/40">Results.</span>
            </h2>
            <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed">
              <p>
                I'm Denis Alexandrescu, an Audiovisual Communication graduate with a deep passion for visual storytelling. My journey started with a camera and an obsession with how light and motion can change a person's perspective.
              </p>
              <p>
                Today, I bridge the gap between pure creativity and business strategy. I don't just make things look "pretty"—I make them work. Whether it's a brand identity for a startup or high-conversion thumbnails for a creator, my focus is always on the outcome.
              </p>
              <p>
                I've spent years refining my taste and technical skills to help brands stand out in a crowded digital landscape. I believe every pixel and every frame should serve a purpose.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <div className="text-3xl font-display font-bold mb-1">5+</div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/40">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold mb-1">150+</div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/40">Projects Delivered</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
