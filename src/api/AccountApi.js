import axiosInstance from './axiosInstance';

export const getAccount = async () => {
  const response = await axiosInstance.get('/Account');
  console.log(response.data.data);
  return response.data.data;
};


export const getUserAccount = async () => {
  const response = await axiosInstance.get('/Account/user-accounts');
  console.log(response.data.data);
  return response.data.data;
};


export const getAccountById = async (id) => {
  const response = await axiosInstance.get(`/Account/${id}`);
  return response.data.data;
};

export const saveAccount = async (model) => {
  const response = await axiosInstance.post('/Account', model);
  return response.data.message;
};

export const deleteAccount = async (id) => {
  const response = await axiosInstance.delete(`/Account/${id}`);
  return response.data.message;
};
