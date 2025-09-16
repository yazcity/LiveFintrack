import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Button, Typography, IconButton
  ,FormControl ,InputLabel,Select, MenuItem
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { formatDate, formatDateTime } from '../../../utils/formatDate';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAccounts, getIncomeExpenseCategory } from '../../../api/DropdownApi';

const EmployeeFormMobile = ({ onClose, onSave, employee }) => {
      const [category, setcategory] = useState([]);
     const [account, setAccount] = useState([]);
    const today = new Date().toISOString().split("T")[0];

const [form, setForm] = useState({ transactionId : 0,transactionDate: today?? "", accountId: 0, categoryId: 0, amount: 0.0, description: "", note: "" });



  useEffect(() => {
       fetchCategory();
       fetchAccounts();
       setForm(employee || { transactionId : 0,transactionDate: today?? "", accountId: 0, categoryId: 0, amount: 0.0, description: "", note: "" });
  }, [employee]);

  // const handleChange = (e) => {
  //   setForm(prev => ({
  //     ...prev,
  //     [e.target.name]: e.target.value
  //   }));
  // };

    const handleChange = (name) => (e) => {
  setForm({ ...form, [name]: e.target.value });
};



      const fetchCategory = async () => {
        try {
          const categories = await getIncomeExpenseCategory(5);
          setcategory(categories || []);
        } catch (err) {
          console.error('Failed to load category:', err);
        }
      }
        
      const fetchAccounts = async () => {
          try {
            const accounts = await getAccounts();
            setAccount(accounts || []);
          } catch (err) {
            console.error('Failed to load account:', err);
          }
        }
  

  const handleSubmit = () => {
    if (form.amount && form.accountId) {
      onSave({ ...employee, ...form });
    }
  };

      const DatePickerInput = React.forwardRef(({ value, onClick, label }, ref) => (
      <TextField
        label={label}
        fullWidth
        margin="normal"
        onClick={onClick}
        value={value}
        inputRef={ref}
        InputLabelProps={{ shrink: true }}
        readOnly
      />
    ));

  return (
    <Box sx={{
      p: 2,
      minHeight: '100vh',
      backgroundColor: '#fafafa',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={onClose}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          {employee ? 'Edit' : 'Add'} Expense
        </Typography>
      </Box>

        <DatePicker
          selected={form.transactionDate}
            onChange={(date) =>
            setForm((prev) => ({ ...prev, transactionDate: date }))
            }
                      dateFormat="dd-MM-yyyy"
                      customInput={<DatePickerInput label="Transaction Date" />}
                      wrapperClassName="full-width-datepicker"
         />

                  <FormControl fullWidth sx={{mb:2}}>
              <InputLabel id="group-type-label">Choose Category</InputLabel>
              <Select label="Account Group Type"
              value={form.categoryId}
              labelId="group-type-label"
              //  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
               onChange={handleChange('categoryId')}
              >
                {category.map((type)=>(<MenuItem key={type.value} value={type.value}>
                  {type.text}
                  </MenuItem>
                ))
                }
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{mb:2}}>
                          <InputLabel id="group-type-label">Choose Account</InputLabel>
                          <Select label="Account Group Type"
                          value={form.accountId}
                          labelId="group-type-label"
                          onChange={handleChange('accountId')}
                          >
                            {account.map((type)=>(<MenuItem key={type.value} value={type.value}>
                              {type.text}
                              </MenuItem>
                            ))
                            }
                          </Select>
            </FormControl>



      <TextField
        label="Amount"
        name="amount"
        value={form.amount}
        onChange={handleChange('amount')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange('description')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Notes"
        name="note"
        value={form.note}
        onChange={handleChange('note')}
        fullWidth
        margin="normal"
      />

      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Save
        </Button>
        <Button fullWidth sx={{ mt: 1 }} onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeFormMobile;
