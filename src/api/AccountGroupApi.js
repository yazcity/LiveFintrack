import axiosInstance from './axiosInstance';

export const getAccountGroups = async () => {
  const response = await axiosInstance.get('/AccountGroup');
  console.log(response.data.data);
  return response.data.data;
};

export const getAccountGroupById = async (id) => {
  const response = await axiosInstance.get(`/AccountGroup/${id}`);
  return response.data.data;
};

export const saveAccountGroup = async (model) => {
  const response = await axiosInstance.post('/AccountGroup', model);
  return response.data.message;
};

export const deleteAccountGroup = async (id) => {
  const response = await axiosInstance.delete(`/AccountGroup/${id}`);
  return response.data.message;
};
