import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, TextField, Alert, Container, styled ,Paper} from '@mui/material';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomSubmitButton from '../components/CustomButton/CustomSubmitButton';
import { loginUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import WelcomeLayout from './Layout/WelcomeLayout';

// Styled components defined outside to avoid re-creation on each render
const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(5),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "64px",
  color: "#fff",
  fontWeight: "bold",
  margin: theme.spacing(4, 0),
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  },
}));

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = await loginUser(form);
      login(token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      // If backend returns message, show it; else fallback message
      const message = err?.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(message);
    }
  };

  return (
<WelcomeLayout>
           <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
        <Typography variant="h5" mb={2} align="center">
        Login
        </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}


            <form onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="email"
                aria-label="email address"
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                margin="normal"
                required
                autoComplete="current-password"
                aria-label="password"
              />
              <CustomSubmitButton
                backgroundColor="#0F1B4C"
                color="#fff"
                buttonText="Login"
                welcomeBtn={false}
                 fullWidth={true} 
              />
            </form>
</Paper>
                </Container>
</WelcomeLayout>
  );
};

export default LoginForm;
