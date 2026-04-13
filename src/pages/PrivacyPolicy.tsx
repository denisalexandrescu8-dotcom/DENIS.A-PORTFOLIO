import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { content } = useLanguage();

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">{content.ui.privacyPolicy}</h1>
        <div className="text-white/70 space-y-6 font-light leading-relaxed">
          <p>{content.privacyPolicyContent.lastUpdated}: {new Date().toLocaleDateString()}</p>
          
          {content.privacyPolicyContent.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">{section.title}</h2>
              <p>
                {section.content}
                {index === content.privacyPolicyContent.sections.length - 1 && (
                  <> <a href={`mailto:${content.global.email}`} className="text-premium-blue hover:underline">{content.global.email}</a></>
                )}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
