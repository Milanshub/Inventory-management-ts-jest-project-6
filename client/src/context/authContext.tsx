import React, { createContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService';  
import { IUser, IUserInput } from '../models/userModel';           

// Define the shape of the context
interface AuthContextType {
  user: IUser | null;                  // Holds the logged-in user data
  login: (email: string, password: string) => Promise<void>;  // Login function
  logout: () => void;                  // Logout function
  register: (userData: IUserInput) => Promise<void>;  // Register function
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);  // User state
  const navigate = useNavigate();  // For navigating after login/logout

  // Function to handle user login
  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await loginUser(email, password);  // Call API to login
      setUser(loggedInUser);  // Set the user data in state
      navigate('/dashboard');  // Navigate to the dashboard after login
    } catch (error) {
      console.error("Login failed", error);  // Handle login errors
      // You might want to add user feedback here
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);  // Clear the user state
    navigate('/login');  // Navigate back to the login page
  };

  // Function to handle user registration
  const register = async (userData: IUserInput) => {
    try {
      const registeredUser = await registerUser(userData);  // Call API to register
      setUser(registeredUser);  // Set the user data in state
      navigate('/dashboard');  // Navigate to the dashboard after registration
    } catch (error) {
      console.error("Registration failed", error);  // Handle registration errors
      // Consider adding user feedback here as well
    }
  };

  // This context provider wraps the entire app, providing authentication state
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
