import { Routes, Route,BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';


export default function AppRoutes() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
