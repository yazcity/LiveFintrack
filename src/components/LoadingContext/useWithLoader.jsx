
// src/utils/withLoader.js
import { useLoading } from './LoadingContext';

export const useWithLoader = () => {
  const { showLoading, hideLoading } = useLoading();

  const withLoader = async (callbackFn) => {
    try {
      showLoading();
      return await callbackFn();
    } finally {
      hideLoading();
    }
  };

  return { withLoader };
};
