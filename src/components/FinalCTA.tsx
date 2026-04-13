import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function FinalCTA() {
  const { content } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Branding & Identity',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Inquiry from ${formData.name} - ${formData.projectType}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${content.global.email}?subject=${subject}&body=${body}`;
  };

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
              {content.contact.headlineStart} <span className="text-white/40">{content.contact.headlineHighlight}</span>
            </h2>
            <p className="text-lg text-white/60 mb-12 font-light leading-relaxed">
              {content.contact.subheadline}
            </p>

            <div className="space-y-6">
              <a href={`mailto:${content.global.email}`} className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-50">{content.ui.emailMe}</div>
                  <div className="text-lg">{content.global.email}</div>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-left"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">{content.ui.name}</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-premium-blue/50 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">{content.ui.email}</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-premium-blue/50 transition-colors" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">{content.ui.projectType}</label>
              <select 
                value={formData.projectType}
                onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-premium-blue/50 transition-colors appearance-none text-white/60"
              >
                <option className="bg-black" value="Branding & Identity">{content.ui.brandingAndIdentity}</option>
                <option className="bg-black" value="Video Editing">{content.ui.videoEditing}</option>
                <option className="bg-black" value="Social Content">{content.ui.socialContent}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-4">{content.ui.message}</label>
              <textarea 
                rows={4} 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-premium-blue/50 transition-colors resize-none" 
              />
            </div>
            <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-bold uppercase tracking-wider hover:bg-white/90 transition-all flex items-center justify-center gap-3 group">
              {content.ui.sendMessage}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
