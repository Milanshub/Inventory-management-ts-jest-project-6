import React, { useContext } from 'react'; 
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Logout } from '@mui/icons-material';


export const Header: React.FC = () => {
    const authContext = useContext(AuthContext); // Get the context
    const navigate = useNavigate();

  // Ensure authContext is defined and access its properties safely
    if (!authContext) {
        return null; // Optionally render nothing or a loading state
    }

    const { user, logout } = authContext; // Destructure user and logout from context

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/login'); // Navigate to the login page after logout
    };

    return (
<>
      {user && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Inventory Management
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button component={Link} to="/dashboard" color="inherit">
                Dashboard
              </Button>
              <Button component={Link} to="/products" color="inherit">
                Products
              </Button>
              <IconButton color="inherit" onClick={handleLogout}>
                <Logout />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
    )
};