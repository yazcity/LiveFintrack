 //const API_BASE_URL = 'http://localhost:18749/api/AuthRegister';
 //const API_BASE_URL = 'https://livefintrackhub.onrender.com/api/AuthRegister';


// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:18749/api',
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;

