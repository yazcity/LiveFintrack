import axiosInstance from './axiosInstance';

export const getTransaction = async (type) => {
  const response = await axiosInstance.get(`/Transaction?type=${type}`);
  console.log(response.data.data);
  return response.data.data;
};

export const getTransactionId = async (id) => {
  const response = await axiosInstance.get(`/Transaction/${id}`);
  return response.data.data;
};


export const saveTransaction = async (model) => {
   console.log('yaz start',model);

  const response = await axiosInstance.post('/Transaction/add-edit', model);
   console.log('yaz end');
  console.log(response);
  return response.data.message;
};


// export const saveTransaction = async (model) => {
//   console.log('YASEEN START');
//   console.log('Payload:', model); // 💡 log the exact data being sent

//   try {
//     const response = await axiosInstance.post('/Transaction/income/', model);

//     console.log('YASEEN END');
//     console.log('Response:', response.data);

//     return response.data.message;
//   } catch (error) {
//     console.error('🔥 Error saving transaction:', error);

//     // Optional: show full response for debugging
//     if (error.response) {
//       console.error('Server responded with:', {
//         status: error.response.status,
//         data: error.response.data,
//       });
//     } else {
//       console.error('No response from server. Possibly network error.');
//     }

//     throw error; // rethrow so caller knows it failed
//   }
// };


// export const saveTransaction = async (model) => {
//   console.log('YASEEN START');

//   try {
//     const response = await axiosInstance.post('/Transaction/income/', model);

//     console.log('YASEEN END');
//     console.log('Response:', response);

//     // Safely return something, even if there's no message
//     return response.data?.message || "Transaction saved successfully";
//   } catch (error) {
//     console.error('🔥 Error saving transaction:', error);

//     if (error.response) {
//       console.error('Server responded with:', {
//         status: error.response.status,
//         data: error.response.data,
//       });
//     } else {
//       console.error('No response from server. Possibly network error.');
//     }

//     throw error; // Important: rethrow to handle in caller
//   }
// };




export const deleteTransaction = async (id) => {
  const response = await axiosInstance.delete(`/Transaction/${id}`);
  return response.data.message;
};
