import React from 'react';
import { Box } from '@mui/material';
import {Header} from '../components/Header';
import Footer from '../components/Footer';

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />  
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {children} 
      </Box>
      <Footer />  
    </Box>
  );
};

export default MainLayout;
