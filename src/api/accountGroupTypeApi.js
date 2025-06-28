import axiosInstance from './axiosInstance';

export const getAccountGroupTypes = async () => {
  const response = await axiosInstance.get('/AccountGroupType');
  return response.data.data;
};

export const getAccountGroupTypeById = async (id) => {
 
  const response = await axiosInstance.get(`/AccountGroupType/${id}`);
 
  return response.data.data;
};

export const saveAccountGroupType = async (model) => {
  const response = await axiosInstance.post('/AccountGroupType/add-edit', model);
  return response.data.message;
};

export const deleteAccountGroupType = async (id) => {
  const response = await axiosInstance.delete(`/AccountGroupType/${id}`);
  return response.data.message;
};
