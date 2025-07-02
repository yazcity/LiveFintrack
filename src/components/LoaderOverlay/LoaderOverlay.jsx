// src/components/LoaderOverlay.js
import { Backdrop, CircularProgress } from '@mui/material';
import { useLoading } from '../../components/LoadingContext/LoadingContext'

const LoaderOverlay = () => {
  const { isLoading } = useLoading();

  return (
    <Backdrop open={isLoading} sx={{ zIndex: 9999, color: '#fff' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoaderOverlay;


