import { Routes, Route,BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Auth/LoginPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import Register from '../pages/Auth/Register';


export default function AppRoutes() {
  return (

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>

    
  );
}
