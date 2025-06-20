import './App.css';
import LoaderOverlay from './components/LoaderOverlay/LoaderOverlay';
import { LoadingProvider } from './components/LoadingContext/LoadingContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
     <AuthProvider>
      <LoadingProvider>
        <LoaderOverlay/>
        <AppRoutes />
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
