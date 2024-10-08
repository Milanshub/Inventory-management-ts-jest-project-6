import React, { useContext } from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const ProtectedRoute: React.FC<RouteProps & { element: React.ReactNode }> = ({ element, ...rest }) => {
  const authContext = useContext(AuthContext); 

  // Check if user is authenticated
  const isAuthenticated = authContext?.user !== null;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" replace />} // Use Navigate for redirection
    />
  );
};

export default ProtectedRoute;
