
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Grid2';   
 // Assuming you're using Unstable_Grid2
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Assuming you have functions for handleSubmit, setEmail, and setPassword

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();   

    // Handle form submission logic here
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
    <Typography variant="h5" gutterBottom>Login</Typography>
    
    {/* Parent Grid2 as a container */}
    <Grid2 container spacing={2}>
      {/* No nested Grid2 here */}
      <div style={{ width: '100%' }}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={{ width: '100%' }}>
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{ width: '100%' }}>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>
      </div>
    </Grid2>
  </Box>
  );
};

export default LoginForm;