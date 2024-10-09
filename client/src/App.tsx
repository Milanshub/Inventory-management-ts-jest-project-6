import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './AppRoutes'; 
import { Header } from './components/Header'; 
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme'; 

const App: React.FC = () => {
  return (
    <Router> 
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Header /> 
          <AppRoutes /> 
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
