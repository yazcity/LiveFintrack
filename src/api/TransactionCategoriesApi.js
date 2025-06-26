import axiosInstance from './axiosInstance';

export const getTransactionCategory = async () => {
  const response = await axiosInstance.get('/TransactionCategory');
  console.log(response.data.data);
  return response.data.data;
};

export const getTransactionCategoryById = async (id) => {
  const response = await axiosInstance.get(`/TransactionCategory/${id}`);
  return response.data.data;
};

export const saveTransactionCategory = async (model) => {
  const response = await axiosInstance.post('/TransactionCategory', model);
  return response.data.message;
};

export const deleteTransactionCategory = async (id) => {
  const response = await axiosInstance.delete(`/TransactionCategory/${id}`);
  return response.data.message;
};
