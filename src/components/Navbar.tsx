import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { content, language, toggleLanguage } = useLanguage();

  const handleScroll = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'work', label: content.ui.work },
    { id: 'services', label: content.ui.services },
    { id: 'about', label: content.ui.about },
    { id: 'process', label: content.process.sectionTitleHighlight }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-full px-6 py-3">
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-display font-bold tracking-tighter"
          >
            {content.global.name.split('.')[0]}<span className="text-white/50 dark:text-gray-400">.{content.global.name.split('.')[1] || ''}</span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70 dark:text-gray-300">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleScroll(item.id)}
              className="hover:text-white dark:hover:text-white transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          
          <ThemeToggle />

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 hover:text-white dark:hover:text-white transition-colors cursor-pointer"
            title="Toggle Language"
          >
            <Globe size={16} />
            <span>{content.ui.languageToggle}</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScroll('contact')}
            className="bg-white text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            {content.ui.contact}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-white/70 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
          >
            <Globe size={20} />
            <span className="text-sm font-medium">{content.ui.languageToggle}</span>
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 left-6 right-6 glass rounded-3xl p-8 md:hidden flex flex-col gap-6 text-center"
        >
          {navItems.map((item) => (
            <button 
              key={item.id} 
              className="text-2xl font-display font-medium"
              onClick={() => handleScroll(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => handleScroll('contact')}
            className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider mt-4"
          >
            {content.ui.contact}
          </button>
        </motion.div>
      )}
    </nav>
  );
}
