import React from 'react';
import { Button, Typography, Stack, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container 
      maxWidth='sm'
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh'  // Ensures it takes up the full height
      }}
    >
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
    </Container>
  );
};

export default HomePage;
