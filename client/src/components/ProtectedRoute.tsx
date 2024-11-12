import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (authContext?.loading) {
    // Optionally, show a loading spinner or similar indicator here
    return <div>Loading...</div>;
  }

  const isAuthenticated = authContext?.user !== null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
