import axiosInstance from './axiosInstance';

export const getAccountGroupTypes = async () => {
  const response = await axiosInstance.get('/Dropdown/account-group-types');
  return response.data.data;
};

export const getIncomeExpenseTypes = async () => {
  const response = await axiosInstance.get('/Dropdown/income-expense-types');
  return response.data.data;
};
