 //const API_BASE_URL = 'http://localhost:18749/api/AuthRegister';
 //const API_BASE_URL = 'https://livefintrackhub.onrender.com/api/AuthRegister';


// src/api/axiosInstance.js
// import axios from 'axios';

// import { showGlobalLoader, hideGlobalLoader } from '../utils/globalLoaderControl';

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:18749/api',
// });

// axiosInstance.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default axiosInstance;


import axios from 'axios';
import { showGlobalLoader, hideGlobalLoader } from '../utils/globalLoaderControl';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://livefintrackhub.onrender.com/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    showGlobalLoader(); // ✅ show loader before request
    return config;
  },
  (error) => {
    hideGlobalLoader();
    return Promise.reject(error);
    
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    hideGlobalLoader(); // ✅ hide loader on success
    return response;
  },
  (error) => {
    hideGlobalLoader(); // ✅ hide loader on error

     if (error.response && error.response.status === 401) {
      // Token is invalid, so remove it and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login'; // 🔁 Redirect user to login page
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
