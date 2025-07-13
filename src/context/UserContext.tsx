import  { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type User = {
  userId: string;
  token: string;
  role: 'user' | 'admin';
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void; 
};

const UserContext = createContext<UserContextType | undefined>(undefined); 

export const UserProvider = ({ children }: { children: ReactNode }) => { 
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} 
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
