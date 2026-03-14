import { createContext, useContext, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('mandishare-lang') || 'en';
  });

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'hi' : 'en';
      localStorage.setItem('mandishare-lang', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
