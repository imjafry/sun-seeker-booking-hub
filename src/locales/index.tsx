import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Language types
export type Language = 'en' | 'es' | 'fr' | 'de' | 'da';

// Interface for language data
export interface LanguageData {
  [key: string]: string | LanguageData;
}

// Context interface
interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  getAvailableLanguages: () => { code: Language; name: string; flag: string }[];
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Available languages
export const availableLanguages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'da' as Language, name: 'Dansk', flag: '🇩🇰' },
];

// Local storage key
const LANGUAGE_STORAGE_KEY = 'sun-seeker-language';

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<LanguageData>({});

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const module = await import(`./translations/${currentLanguage}.ts`);
        setTranslations(module.default);
      } catch (error) {
        console.error(`Failed to load translations for ${currentLanguage}:`, error);
        // Fallback to English
        const fallbackModule = await import('./translations/en.ts');
        setTranslations(fallbackModule.default);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  // Set language function
  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  // Get available languages
  const getAvailableLanguages = () => availableLanguages;

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    getAvailableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 