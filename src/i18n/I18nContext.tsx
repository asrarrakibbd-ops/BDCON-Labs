import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale } from '../types/settings';
import { I18nContextType, TranslationDictionary } from './types';
import { en } from './en';
import { bn } from './bn';

const dictionaries: Record<Locale, TranslationDictionary> = { en, bn };

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'bdcon_locale';

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale;
      if (saved === 'en' || saved === 'bn') return saved;
    }
    // Default to Bengali for target audience in Bangladesh
    return 'bn';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
      document.documentElement.setAttribute('data-locale', newLocale);
      document.body.setAttribute('data-locale', newLocale);
      if (newLocale === 'bn') {
        document.documentElement.classList.add('lang-bn');
        document.documentElement.classList.remove('lang-en');
        document.body.classList.add('lang-bn');
        document.body.classList.remove('lang-en');
      } else {
        document.documentElement.classList.add('lang-en');
        document.documentElement.classList.remove('lang-bn');
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-bn');
      }
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.setAttribute('data-locale', locale);
    document.body.setAttribute('data-locale', locale);
    if (locale === 'bn') {
      document.documentElement.classList.add('lang-bn');
      document.documentElement.classList.remove('lang-en');
      document.body.classList.add('lang-bn');
      document.body.classList.remove('lang-en');
    } else {
      document.documentElement.classList.add('lang-en');
      document.documentElement.classList.remove('lang-bn');
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-bn');
    }
  }, [locale]);

  const t = (path: string, fallback?: string): string => {
    const dict = dictionaries[locale] || dictionaries.en;
    const parts = path.split('.');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = dict;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Fallback to English dictionary if not found in current locale
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let enCurrent: any = dictionaries.en;
        for (const enPart of parts) {
          if (enCurrent && typeof enCurrent === 'object' && enPart in enCurrent) {
            enCurrent = enCurrent[enPart];
          } else {
            return fallback || path;
          }
        }
        return typeof enCurrent === 'string' ? enCurrent : (fallback || path);
      }
    }
    
    return typeof current === 'string' ? current : (fallback || path);
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t,
        isBangla: locale === 'bn',
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}
