import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import CopyToClipboard from './CopyToClipboard';
import { LiquidButton } from './ui/liquid-glass-button';

export default function FinalCTA() {
  const { content, language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Identidad visual completa',
    budget: '1.000 € – 2.500 €',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(data.error || 'Error al enviar mensaje');
      }
    } catch (err: any) {
      console.warn('API contact request failed, falling back to mailto:', err);
      const subject = encodeURIComponent(`Nuevo Proyecto: ${formData.name} - ${formData.projectType}`);
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\nEmail: ${formData.email}\nTipo de encargo: ${formData.projectType}\nPresupuesto: ${formData.budget}\n\nDetalles del encargo:\n${formData.message}`
      );
      const mailtoUrl = `mailto:${content.global.email}?subject=${subject}&body=${body}`;
      
      const tempLink = document.createElement('a');
      tempLink.href = mailtoUrl;
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="section-padding relative overflow-hidden">
        <div className="max-w-3xl mx-auto glass p-12 md:p-20 rounded-[3rem] border border-white/10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-display font-bold text-white">{content.ui.thanks}</h2>
            <p className="text-xl text-white/80 font-light max-w-lg mx-auto leading-relaxed">
              {content.contact.successMessage || (language === 'es' 
                ? 'He recibido tu mensaje. Te responderé por correo en menos de 24 h con una primera valoración de fechas y presupuesto.' 
                : 'I have received your message. I will reply by email within 24 hours with an initial assessment and timeline.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <LiquidButton 
                onClick={() => setIsSubmitted(false)}
                className="text-white font-bold"
                size="lg"
              >
                {content.ui.backToForm}
              </LiquidButton>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="max-w-5xl mx-auto glass p-10 md:p-16 rounded-[3rem] border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left flex flex-col justify-between"
          >
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.05] tracking-tight text-white">
                {content.contact.h2}
              </h2>
              <p className="text-lg text-white/80 mb-8 font-light leading-relaxed">
                {content.contact.subtitle}
              </p>
            </div>

            <div className="space-y-5">
              {/* Direct email card with copy */}
              <div className="flex items-center gap-4 text-white/80 p-4 rounded-2xl bg-white/[0.02] border border-white/10 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-premium-gold shrink-0 group-hover:border-premium-gold/40 transition-all">
                  <Mail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono uppercase tracking-widest text-white/60 mb-1">
                    {content.contact.directEmailLabel}
                  </div>
                  <div className="text-base md:text-lg break-all font-medium text-white">
                    {content.contact.directEmail}
                  </div>
                </div>
                <div className="shrink-0">
                  <CopyToClipboard text={content.contact.directEmail} />
                </div>
              </div>

              {/* WhatsApp direct — without showing phone number */}
              {content.global.whatsapp && (
                <a 
                  href={`https://wa.me/${content.global.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(content.contact.whatsappMessageText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white/80 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-all">
                    <MessageSquare size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-medium text-white">
                      {content.contact.whatsappLabel}
                    </div>
                  </div>
                </a>
              )}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-5 text-left"
            onSubmit={handleSubmit}
          >
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/70 ml-2 font-medium">
                  {content.contact.form.nameLabel} *
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder={content.contact.form.namePlaceholder} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-premium-gold/50 focus:ring-1 focus:ring-premium-gold/50 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/70 ml-2 font-medium">
                  {content.contact.form.emailLabel} *
                </label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder={content.contact.form.emailPlaceholder} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-premium-gold/50 focus:ring-1 focus:ring-premium-gold/50 transition-colors" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/70 ml-2 font-medium">
                  {content.contact.form.projectTypeLabel}
                </label>
                <select 
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  className="w-full bg-dark-surface border border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-premium-gold/50 focus:ring-1 focus:ring-premium-gold/50 transition-colors text-white" 
                >
                  {content.contact.form.projectTypeOptions.map((opt: string) => (
                    <option key={opt} className="bg-black text-white" value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/70 ml-2 font-medium">
                  {content.contact.form.budgetLabel}
                </label>
                <select 
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full bg-dark-surface border border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-premium-gold/50 focus:ring-1 focus:ring-premium-gold/50 transition-colors text-white" 
                >
                  {content.contact.form.budgetOptions.map((opt: string) => (
                    <option key={opt} className="bg-black text-white" value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-white/70 ml-2 font-medium">
                {content.contact.form.messageLabel} *
              </label>
              <textarea 
                rows={4} 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder={content.contact.form.messagePlaceholder} 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-premium-gold/50 focus:ring-1 focus:ring-premium-gold/50 transition-colors resize-none" 
              />
            </div>

            <div className="pt-2">
              <LiquidButton 
                type="submit" 
                disabled={isSubmitting}
                className="w-full text-white font-bold uppercase tracking-wider group focus-visible:ring-2 focus-visible:ring-premium-gold"
                size="xl"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>{language === 'es' ? 'Enviando...' : 'Sending...'}</span>
                    </>
                  ) : (
                    <>
                      {content.contact.form.submitButton}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </LiquidButton>
              <p className="text-xs font-mono text-white/60 text-center mt-3">
                {content.contact.form.microcopy}
              </p>
            </div>
          </motion.form>
        </div>

        {/* Bloque para agencias y estudios debajo del formulario */}
        {content.about.agencyBlock && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <div>
                <h3 className="text-sm font-display font-semibold text-white/90 mb-1">
                  {content.about.agencyBlock.title}
                </h3>
                <p className="text-xs md:text-sm font-light text-white/60 leading-relaxed">
                  {content.about.agencyBlock.description}
                </p>
              </div>
              <a 
                href={`mailto:${content.about.agencyBlock.email}`} 
                className="shrink-0 text-xs md:text-sm font-mono text-white hover:text-premium-gold underline underline-offset-4 transition-colors"
              >
                {content.about.agencyBlock.email}
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
