import axiosInstance from './axiosInstance';

export const getAccountGroupTypes = async () => {
  const response = await axiosInstance.get('/Dropdown/account-group-types');
  return response.data.data;
};

export const getAccountGroup = async (id) => {
  const response = await axiosInstance.get(`/Dropdown/account-groups/${id}`);
  return response.data.data;
};

export const getIncomeExpenseTypes = async () => {
  const response = await axiosInstance.get('/Dropdown/income-expense-types');
  return response.data.data;
};

export const getIncomeExpenseCategory = async (typeId) => {
  const response = await axiosInstance.get(`/Dropdown/income-expense-categories/${typeId}`);
  return response.data.data;
};




export const getAccounts = async () => {
  const response = await axiosInstance.get('/Dropdown/accounts');
  return response.data.data;
};




