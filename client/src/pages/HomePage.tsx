import React from 'react';
import { Button, Typography, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Box textAlign="center" sx={{ mt: 5 }}>
      
      <Typography variant="h4" gutterBottom>
        Welcome to Inventory Management
      </Typography>

     
      <Stack direction="column" spacing={2} alignItems="center">
      
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{ width: '200px' }} 
        >
          Login
        </Button>

        
        <Button
          component={Link}
          to="/register"
          variant="outlined"
          sx={{ width: '200px' }}  
        >
          Register
        </Button>
      </Stack>
    </Box>
  );
};

export default HomePage;
