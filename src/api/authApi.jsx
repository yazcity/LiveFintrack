// src/api/authApi.js
//import axios from 'axios';

// const API_BASE_URL = 'http://localhost:18749/api/AuthRegister';
// const API_BASE_URL = 'https://livefintrackhub.onrender.com/api/AuthRegister';

// export const loginUser = async (loginData) => {
//   const response = await axios.post(`${API_BASE_URL}/login`, loginData);
//   console.log(response.data.data);
//   return response.data.data; // because your API returns { data, message }
// };


// src/api/authApi.js
import axiosInstance from './axiosInstance';

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post('/AuthRegister/login', loginData);

  console.log(response.data.data,"yazz");
  return response.data.data; // because your API returns { data, message }

};

export const registerUser = async (registerData) => {
  const response = await axiosInstance.post('/AuthRegister/register', registerData);
  return response.data.message;
};


