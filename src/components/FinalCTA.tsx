import { motion } from 'motion/react';
import { ArrowRight, Mail, Calendar } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-premium-blue/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[3rem] border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-[0.9] tracking-tighter">
              Your brand deserves visuals <span className="text-white/40">people remember.</span>
            </h2>
            <p className="text-lg text-white/60 mb-12 font-light leading-relaxed">
              Ready to elevate your visual presence? Let's build something that drives real business growth.
            </p>

            <div className="space-y-6">
              <a href="mailto:hello@denis.a" className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-50">Email Me</div>
                  <div className="text-lg">hello@denis.a</div>
                </div>
              </a>
              <div className="flex items-center gap-4 text-white/60 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                  <Calendar size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-50">Book a Call</div>
                  <div className="text-lg">Schedule a Discovery Session</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-left"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-premium-blue/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">Email</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-premium-blue/50 transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">Project Type</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-premium-blue/50 transition-colors appearance-none text-white/60">
                <option className="bg-black">Branding & Identity</option>
                <option className="bg-black">Video Editing</option>
                <option className="bg-black">Social Content</option>
                <option className="bg-black">Full Creative Strategy</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">Message</label>
              <textarea rows={4} placeholder="Tell me about your project..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-premium-blue/50 transition-colors resize-none" />
            </div>
            <button className="w-full bg-white text-black py-5 rounded-2xl font-bold uppercase tracking-wider hover:bg-white/90 transition-all flex items-center justify-center gap-3 group">
              Send Message
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
