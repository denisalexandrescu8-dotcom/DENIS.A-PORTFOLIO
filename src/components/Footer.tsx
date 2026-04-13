import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { content } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-2xl font-display font-bold tracking-tighter">
            {content.global.name.split('.')[0]}<span className="text-white/50">.{content.global.name.split('.')[1] || ''}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
          <div>© {currentYear} {content.global.name}. {content.ui.allRightsReserved}.</div>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">{content.ui.privacyPolicy}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{content.ui.termsOfService}</Link>
          </div>
          <div>{content.global.location}</div>
        </div>
      </div>
    </footer>
  );
}
