// src/pages/Dashboard.jsx
import { useAuth } from '../../context/AuthContext';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleLogout = () => {
    logout();
    navigate('/login'); // ✅ Redirect to login after logout
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">
        Welcome, {user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || user?.nameid}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
