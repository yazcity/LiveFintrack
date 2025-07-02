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
   console.log('yaz start');
  const response = await axiosInstance.post('/Account', model);
   console.log('yaz end');
  console.log(response);
  return response.data.message;
};

export const deleteAccount = async (id) => {
  const response = await axiosInstance.delete(`/Account/${id}`);
  return response.data.message;
};
