import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import React from 'react';

export default function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated ? children : <Navigate to="/login" />;
}
