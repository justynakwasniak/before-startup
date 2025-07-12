//bramka chroniaca dostep
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import React from 'react';

export default function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useAuth(); // Sprawdza, czy użytkownik jest zalogowany
  return isAuthenticated ? children : <Navigate to="/login" />; // Jeśli nie, przekierowuje do strony logowania
}
