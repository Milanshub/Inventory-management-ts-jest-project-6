import React from 'react';
import { AppBar, Toolbar, Typography, Box, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <AppBar position="static" color="primary" sx={{ top: 'auto', bottom: 0, backgroundColor: '#1ABC9C' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1" align="left">
            &copy; {new Date().getFullYear()} Inventory Management. All rights reserved.
          </Typography>
        </Box>

        {/* You can add footer navigation or links here if necessary */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/privacy" color="inherit" sx={{ mx: 2 }}>
            Privacy Policy
          </Link>
          <Link href="/terms" color="inherit" sx={{ mx: 2 }}>
            Terms of Service
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
