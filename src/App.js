import './App.css';
import LoaderOverlay from './components/LoaderOverlay/LoaderOverlay';
import { LoadingProvider } from './components/LoadingContext/LoadingContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import LoaderBinder from './components/LoaderOverlay/LoaderBinder'; // ✅ Add this



function App() {
  return (
     <AuthProvider>
      <LoadingProvider>
        <LoaderBinder/>
        <LoaderOverlay/>
        <AppRoutes />
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
