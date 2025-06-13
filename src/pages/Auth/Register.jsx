import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Stack,
  Paper
} from '@mui/material';
import { registerUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const result = await registerUser(formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
        <Typography variant="h5" mb={2} align="center">
          Create Your Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              name="Name"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="Password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              label="Confirm Password"
              name="ConfirmPassword"
              type="password"
              fullWidth
              value={formData.ConfirmPassword}
              onChange={handleChange}
              required
            />

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Button type="submit" variant="contained" size="large">
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
