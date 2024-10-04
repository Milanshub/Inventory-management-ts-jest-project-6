import React, {useState} from 'react'
import { TextField, Button, Typography, Box, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { registerUser } from '@/services/userService';
import log from '@/utils/logger';

// Creating a custom-styled component called 'Item' based on the 'Paper' component
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const RegisterForm: React.FC = () => {
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 

    const handleSubmit =async (e: React.FormEvent) => {
        e.preventDefault(); 

        try {
            await registerUser({ name, email, password}); 

            log.info('Registration successful!');
            setName('');
            setEmail('');
            setPassword('');
            setError(''); 
        } catch (error) {
            setError('Registration failed please try again'); 
        }
    }; 


    return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <Stack spacing={2}>
        {/* Error message display */}
        {error && (
          <Typography color="error">
            {error}
          </Typography>
        )}
        <Item>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Item>
        <Item>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Item>
        <Item>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Item>
        <Item>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Item>
      </Stack>
    </Box>
    )
};

export default RegisterForm; 