import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import enContent from '../i18n/en.json';
import esContent from '../i18n/es.json';

type Language = 'en' | 'es';
type ContentType = typeof enContent;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  content: ContentType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Check local storage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'en' || saved === 'es') {
      return saved;
    }
    
    // Auto-detect based on browser language/region
    if (typeof navigator !== 'undefined' && navigator.language) {
      if (navigator.language.toLowerCase().startsWith('es')) {
        return 'es';
      }
    }
    
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  const content = language === 'en' ? enContent : esContent;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
