import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
