import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, logoutUser } from '../services/authService';
import { fetchUserById } from '../services/userService';
import { IUser, IUserInput } from '../models/userModel';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
}

interface AuthContextType {
  user: IUser | null;
  loading: boolean; // Added loading state
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: IUserInput) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          if (decoded.id) {
            const fetchedUser = await fetchUserById(decoded.id);
            setUser(fetchedUser);
          }
        } catch (error) {
          console.error("Failed to fetch user on load", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false); // Set loading to false after attempt
    };
    initializeUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await loginUser(email, password);
      setUser(loggedInUser);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  const register = async (userData: IUserInput) => {
    try {
      const registeredUser = await registerUser(userData);
      setUser(registeredUser);
      navigate('/dashboard');
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
