import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import AppRoutes from './AppRoutes'; 
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme'; 
import ErrorBoundary from "./components/errorBoundary";
import { ProductProvider } from "./context/ProductContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router> 
        <AuthProvider>
          <ProductProvider>
            <ThemeProvider theme={theme}>
              <AppRoutes /> 
              <ToastContainer />
            </ThemeProvider>
          </ProductProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
