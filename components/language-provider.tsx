'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, getTranslation, Translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
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
    } else {
      // Default to Thai for Thai lottery
      setLanguage('th');
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

  if (!mounted) {
    // Return a provider with default Thai translations during SSR
    return (
      <LanguageContext.Provider
        value={{
          language: 'th',
          setLanguage: handleSetLanguage,
          t: getTranslation('th'),
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
} 