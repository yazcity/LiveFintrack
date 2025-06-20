// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProtectedRoute = () => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProtectedRoute = () => {
//   const { isAuthenticated } = useAuth();

//   if (isAuthenticated === null) {
//     // Still checking auth status, show a loader or null
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;




import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
