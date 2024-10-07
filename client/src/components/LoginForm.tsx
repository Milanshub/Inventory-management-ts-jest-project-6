
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom'; 
import log from '@/utils/logger';
import { loginUser } from '@/services/authService';

// Creating a custom-styled component called 'Item' based on the 'Paper' component
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 

    try {
        const user = await loginUser(email, password); 

        log.info('Logged in user', user);

        setEmail('');
        setPassword(''); 
        setError(null);
    } catch (error: any) {
        log.error('Login failed', error.response?.data);
        setError(error.response?.data?.message || 'An error occurred during login.'); 
    }
  };

  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      {/* Stack with custom styled Item */}
      <Stack spacing={2}>
        {/* Error message display */}
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}
        <Item>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Item>
        <Item>
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Item>
        <Item>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </Item>

        {/* Register prompt with MUI Link */}
        <Typography variant="body2" align="center">
          Don't have an account yet?{' '}
          <Link component={RouterLink} to="/register" underline="always" color="primary">
            Register
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginForm;