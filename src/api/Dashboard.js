import axiosInstance from './axiosInstance';

export const getDashboard = async () => {
  const response = await axiosInstance.get('/Dashboard/');
  return response.data.data;
};
