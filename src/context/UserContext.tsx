import  { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Typy danych użytkownika
type User = {
  userId: string;
  token: string;
  role: 'user' | 'admin';
} | null;

// Typ kontekstu
type UserContextType = {
  user: User;
  setUser: (user: User) => void; // Funkcja do ustawiania użytkownika
};

// Domyślna wartość
const UserContext = createContext<UserContextType | undefined>(undefined); 

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => { //trzyma usera i setUser
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} 
    </UserContext.Provider>
  );
};

// Hook do użycia kontekstu
export const useUser = (): UserContextType => { //daje dostep do tych wartosci wszedzie
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
