// src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';
import { Button, Typography } from '@mui/material';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Welcome, {user?.name || user?.email}</Typography>
      <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
