// src/components/LoaderOverlay/LoaderBinder.jsx
import { useEffect } from 'react';
import { useLoading } from '../LoadingContext/LoadingContext';
import { setGlobalLoaderControl } from  '../../utils/globalLoaderControl';

const LoaderBinder = () => {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setGlobalLoaderControl(showLoading, hideLoading);
  }, [showLoading, hideLoading]);

  return null;
};

export default LoaderBinder;
