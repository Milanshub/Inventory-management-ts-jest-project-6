import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Home page
import LoginPage from './pages/LoginPage'; // Login page
import RegisterPage from './pages/RegisterPage'; // Register page
import Dashboard from './pages/Dashboard'; // Dashboard component
import NotFoundPage from './pages/NotFoundPage'; // 404 Page
import ProtectedRoute from './components/ProtectedRoute'; // Protected routes

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* Home Page */}
      <Route path="/login" element={<LoginPage />} /> {/* Login Page */}
      <Route path="/register" element={<RegisterPage />} /> {/* Register Page */}
      
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Dashboard />} />} // Protect the dashboard
      />
      
      <Route path="*" element={<NotFoundPage />} /> {/* 404 Page */}
    </Routes>
  );
};

export default AppRoutes;
