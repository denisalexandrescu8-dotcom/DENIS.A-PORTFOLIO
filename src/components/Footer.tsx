import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { content } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-gray-200 dark:border-white/5 bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-2xl font-display font-bold tracking-tighter">
            {content.global.name.split('.')[0]}<span className="text-gray-500 dark:text-white/50">.{content.global.name.split('.')[1] || ''}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 dark:text-white/20">
          <div>© {currentYear} {content.global.name}. {content.ui.allRightsReserved}.</div>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">{content.ui.privacyPolicy}</Link>
            <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">{content.ui.termsOfService}</Link>
          </div>
          <div>{content.global.location}</div>
        </div>
      </div>
    </footer>
  );
}
