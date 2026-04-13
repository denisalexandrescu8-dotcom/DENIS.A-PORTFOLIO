import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import content from '../content.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-white/5 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-2xl font-display font-bold tracking-tighter">
            {content.global.name.split('.')[0]}<span className="text-white/50">.{content.global.name.split('.')[1] || ''}</span>
          </div>

          <div className="flex items-center gap-6">
            {[
              { icon: Instagram, href: content.global.socials.instagram },
              { icon: Linkedin, href: content.global.socials.linkedin },
              { icon: Twitter, href: content.global.socials.twitter },
              { icon: Youtube, href: content.global.socials.youtube }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
          <div>© {currentYear} {content.global.name}. All Rights Reserved.</div>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div>{content.global.location}</div>
        </div>
      </div>
    </footer>
  );
}
