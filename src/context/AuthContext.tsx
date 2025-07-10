import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  token: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));

  const login = (username: string) => {
    // 👇 Symulacja: login zawsze się udaje
    const fakeToken = `fake-token-for-${username}`;
    localStorage.setItem('auth_token', fakeToken);
    setToken(fakeToken);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
