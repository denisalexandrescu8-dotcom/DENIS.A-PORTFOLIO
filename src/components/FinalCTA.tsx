import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageSquare, Clock, Calendar, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
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
    projectType: 'Branding & Identity',
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
      // Fallback smoothly to mailto if server/network fails
      const subject = encodeURIComponent(`Nuevo Proyecto: ${formData.name} - ${formData.projectType}`);
      const body = encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\nTipo de proyecto: ${formData.projectType}\n\nMensaje:\n${formData.message}`);
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

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hola Denis! Mi nombre es ${formData.name || 'un cliente'}. Me interesa hablar sobre un proyecto de ${formData.projectType}. \n\nMensaje: ${formData.message || 'Me gustaría saber más sobre tus servicios y disponibilidad.'}`);
    const whatsappUrl = `https://wa.me/${content.global.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${text}`;
    window.open(whatsappUrl, '_blank');
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
            <div className="w-20 h-20 bg-premium-gold/10 border border-premium-gold/30 rounded-full flex items-center justify-center mx-auto text-premium-gold">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-4xl font-display font-bold text-white">{content.ui.thanks}</h2>
            <p className="text-xl text-white/80 font-light max-w-lg mx-auto leading-relaxed">
              {language === 'es' 
                ? 'He recibido tu mensaje correctamente. Revisaré los detalles y te responderé en menos de 24 horas.' 
                : 'Your inquiry has been received successfully. I will review the brief and get back to you within 24 hours.'}
            </p>
            <div className="py-4 px-6 md:px-8 bg-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-premium-gold max-w-md mx-auto overflow-hidden border border-white/10">
              <span className="break-all text-sm md:text-base text-white">{content.global.email}</span>
              <div className="shrink-0">
                <CopyToClipboard text={content.global.email} />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <LiquidButton 
                onClick={() => handleWhatsApp()}
                className="text-white font-bold"
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare size={18} />
                  {language === 'es' ? 'Escribir por WhatsApp' : 'Chat on WhatsApp'}
                </span>
              </LiquidButton>
              <LiquidButton 
                onClick={() => setIsSubmitted(false)}
                className="text-white/70 font-bold"
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
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-premium-gold/10 border border-premium-gold/30 text-premium-gold text-xs font-mono mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {language === 'es'
                    ? 'Disponibilidad: 2 proyectos este trimestre'
                    : 'Availability: 2 projects this quarter'}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[0.95] tracking-tight text-white">
                {content.contact.headlineStart}{' '}
                <span className="text-white/40">{content.contact.headlineHighlight}</span>
              </h2>
              <p className="text-lg text-white/80 mb-8 font-light leading-relaxed">
                {content.contact.subheadline}
              </p>

              {/* Turnaround notice */}
              <div className="flex items-center gap-3 text-white/70 text-sm font-mono mb-10">
                <Clock size={16} className="text-premium-gold" />
                <span>{language === 'es' ? 'Respuesta habitual en menos de 24h' : 'Typical response time within 24h'}</span>
              </div>
            </div>

            <div className="space-y-5">
              {/* Direct email card */}
              <div className="flex items-center gap-4 text-white/80 p-3 rounded-2xl bg-white/[0.02] border border-white/10 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-premium-gold shrink-0 group-hover:border-premium-gold/40 transition-all">
                  <Mail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono uppercase tracking-widest text-white/60">{content.ui.emailMe}</div>
                  <div className="text-base md:text-lg break-all font-medium text-white">{content.global.email}</div>
                </div>
                <div className="shrink-0">
                  <CopyToClipboard text={content.global.email} />
                </div>
              </div>

              {/* WhatsApp direct */}
              {content.global.whatsapp && (
                <a 
                  href={`https://wa.me/${content.global.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(language === 'es' ? 'Hola Denis, me gustaría consultar la disponibilidad para un proyecto.' : 'Hi Denis, I would like to check your availability for a project.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white/80 p-3 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-all">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-white/60">WhatsApp Directo</div>
                    <div className="text-base font-medium text-white">{content.ui.whatsappAction}</div>
                  </div>
                </a>
              )}

              {/* Call option */}
              <div className="flex items-center gap-4 text-white/80 p-3 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-premium-gold shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/60">
                    {language === 'es' ? 'Reunión de Valoración' : 'Discovery Call'}
                  </div>
                  <div className="text-sm text-white/80">
                    {language === 'es' ? '15 min para explorar tu proyecto y objetivos' : '15 min to explore your scope & goals'}
                  </div>
                </div>
              </div>
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
                  {content.ui.name} *
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Tu nombre o empresa" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-premium-gold/50 focus:ring-1 focus:ring-premium-gold/50 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-white/70 ml-2 font-medium">
                  {content.ui.email} *
                </label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="nombre@empresa.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-premium-gold/50 focus:ring-1 focus:ring-premium-gold/50 transition-colors" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-white/70 ml-2 font-medium">
                {content.ui.projectType}
              </label>
              <select 
                value={formData.projectType}
                onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                className="w-full bg-dark-surface border border-white/10 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-premium-gold/50 focus:ring-1 focus:ring-premium-gold/50 transition-colors text-white" 
              >
                <option className="bg-black text-white" value="Branding & Identity">{content.ui.brandingAndIdentity}</option>
                <option className="bg-black text-white" value="Video Editing">{content.ui.videoEditing}</option>
                <option className="bg-black text-white" value="Social Media Content">{content.ui.socialContent}</option>
                <option className="bg-black text-white" value="Creative Strategy & Full Package">
                  {language === 'es' ? 'Estrategia Creativa & Pack Integral' : 'Creative Strategy & Full Package'}
                </option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-white/70 ml-2 font-medium">
                {content.ui.message} *
              </label>
              <textarea 
                rows={4} 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder={language === 'es' ? 'Cuéntame sobre el objetivo de tu proyecto, plazos aproximados o presupuesto previsto...' : 'Tell me about your project goals, estimated timeline, or budget...'} 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-premium-gold/50 focus:ring-1 focus:ring-premium-gold/50 transition-colors resize-none" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
                      {content.ui.sendMessage}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </LiquidButton>

              <LiquidButton 
                type="button"
                onClick={handleWhatsApp}
                className="w-full text-[#25D366] font-bold uppercase tracking-wider group focus-visible:ring-2 focus-visible:ring-premium-gold"
                size="xl"
              >
                <span className="flex items-center justify-center gap-3">
                  {content.ui.whatsapp}
                  <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                </span>
              </LiquidButton>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
