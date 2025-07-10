// // LanguageContext.tsx
// Zastosowanie Context API do zarządzania językiem interfejsu
// Cel: Przełączanie języka EN/PL w aplikacji
//  Technologie: React Context
//  Zakres:
// Stworzenie LanguageContext


// Hook useContext


// Przełącznik języka w headerze

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'pl' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pl');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
