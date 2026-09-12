import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { content } = useLanguage();

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-xl">
          <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
            {content.footer.bio}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono uppercase tracking-[0.15em] text-white/60 pt-6 border-t border-white/10">
          <div>
            © 2026 Denis Alexandrescu. {content.footer.rights}
          </div>
          <div className="flex flex-wrap gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              {content.ui.privacyPolicy}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              {content.ui.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
