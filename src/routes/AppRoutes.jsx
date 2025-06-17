import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Auth/LoginPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import Register from '../pages/Auth/Register';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Box } from '@mui/material';
import AuthPage from '../pages/Auth/AuthPage';
import LoginPage from '../pages/Auth/LoginPage';
import WelcomeLayout from '../components/Layout/WelcomeLayout';

export default function AppRoutes() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Full screen height
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1 }}> {/* This is the main content area */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}
