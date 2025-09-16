import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button,FormControl ,InputLabel, Select, MenuItem
} from '@mui/material';

import { formatDate, formatDateTime } from '../../../utils/formatDate';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { getAccounts, getIncomeExpenseCategory } from '../../../api/DropdownApi';

const ExpenseDialog = ({ open, onClose, onSave, employee }) => {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({ transactionId : 0,transactionDate: today?? "", accountId: 0, categoryId: 0, amount: 0.0, description: "", note: "" });
  const [category, setcategory] = useState([]);
   const [account, setAccount] = useState([]);
  
  useEffect(() => {
       fetchCategory();
       fetchAccounts();
    setForm(employee || { transactionId : 0,transactionDate: today?? "", accountId: 0, categoryId: 0, amount: 0.0, description: "", note: "" });
  }, [employee]);

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleChange = (name) => (e) => {
  setForm({ ...form, [name]: e.target.value });
};

  const handleSubmit = () => {
    onSave({ ...employee, ...form });
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{employee ? 'Edit' : 'Add'} Employee</DialogTitle>
      <DialogContent>

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

        <TextField fullWidth   margin="dense" label="Amount" name="amount" value={form.amount} onChange={handleChange('amount')} />
        <TextField fullWidth multiline rows={3} margin="dense" label="Description" name="description" value={form.description} onChange={handleChange('description')} />
        <TextField fullWidth multiline rows={3} margin="dense" label="notes" name="note" value={form.note} onChange={handleChange('note')} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}  disabled={!form.amount} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseDialog;
