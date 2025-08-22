import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    console.log('ProtectedRoute: User not authenticated, redirecting to register');
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
