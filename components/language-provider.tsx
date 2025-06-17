'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, getTranslation, Translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'th',
  setLanguage: () => {},
  t: getTranslation('th'),
});

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('th');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('lottery-language') as Language;
    if (savedLanguage && (savedLanguage === 'th' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('lottery-language', language);
      // Update document language
      document.documentElement.lang = language === 'th' ? 'th' : 'en';
    }
  }, [language, mounted]);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const translations = getTranslation(language);

  const contextValue = {
    language,
    setLanguage: handleSetLanguage,
    t: translations,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
} 