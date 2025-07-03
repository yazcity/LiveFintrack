import React, { useState, useEffect } from 'react'
import { getAccounts, getIncomeExpenseCategory } from '../../../api/DropdownApi';
import {saveTransaction, getTransaction, deleteTransaction} from '../../../api/TransactionApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import { formatDate, formatDateTime } from '../../../utils/formatDate';
import { Box ,Button,Typography, Dialog, DialogTitle, DialogContent, TextField, FormControl,
   InputLabel, Select, MenuItem, DialogActions
  ,Paper,TableCell,
  TableRow,
  TableBody,
  IconButton,
  TableHead,
  Table,
 useMediaQuery, useTheme } from '@mui/material' 

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import '../Income/Income.css'

function Income() {

      const today = new Date().toISOString().split("T")[0];
      const [open ,setOpen] = useState(false);
      const [editId, setEditId] = useState(null);
      const [formData, setFormData] = useState({transactionId : 0,transactionDate: today?? "", accountId: 0, categoryId: 0, amount: 0.0, description: "", notes: "" });
      const [incomeTransaction,setIncomeTransaction] =useState([]);
      const [selectedAccountId, setSelectedAccountId] = useState('');
      const [slectedCategoryId, setSlectedCategoryId] = useState('');
      const [account, setAccount] = useState([]);
      const [category, setcategory] = useState([]);

      useEffect(() => {
        fetchTransaction();
        fetchAccounts();
        fetchCategory();
      }, []);

      const fetchTransaction = async () => {
      try {
        const data = await getTransaction(3);
        setIncomeTransaction(data || []);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load account.", "error");
      }
  };


  const openDialog = async (editData = null) => {
 
    console.log('edit date', editData)
    if (editData) {
      setEditId(editData.transactionId);
      setFormData({
        transactionId: editData.transactionId,
        transactionDate: editData.transactionDate,
        accountId: editData.accountId,
        categoryId: editData.categoryId,
        amount: editData.amount || 0,
        description: editData.description || "",
        notes: editData.notes || "",

      });
      setSelectedAccountId(editData.accountId);
      setSlectedCategoryId(editData.categoryId);
     
    } else {
      setEditId(null);
      setFormData({ transactionId:0, accountId: 0, categoryId: 0, amount: 0.0, description: "", notes: "" });
     
    }
       setOpen(true); 
  };


  const handleChange = (e) =>{
     setFormData((prev) => ({...prev,[e.target.name]: e.target.value}));
  }

    const handleAccountChange = async (e) => {
    const accountId = e.target.value;
     setSelectedAccountId(accountId);
     
    }

const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
     setSlectedCategoryId(categoryId);
     
    }


    const handleClose = () => {
    setOpen(false);
    setEditId(null);
  }


    const handleSave = async () => {
     const { accountId, categoryId, amount, description, notes } = formData;
   if (!amount) {
        Swal.fire("Warning", "Account name is required.", "warning");
        return;
      }
  
      const payload = {
        TransactionId: editId || 0,
        TransactionDate: formData.transactionDate,
        Amount: parseFloat(amount) || 0.0,
        Description: description.trim(),
        Note: notes.trim(),
        CategoryId: slectedCategoryId ? parseInt(slectedCategoryId) : 0,
        AccountId: selectedAccountId ? parseInt(selectedAccountId) : 0
      };

      console.log(payload,'payload dada');
  
   try {
        await saveTransaction(payload);
        Swal.fire("Success", "Income added successfully.", "success");
        handleClose();
        fetchTransaction();
 
      } catch (err) {
        console.error(err);
        handleClose();
        Swal.fire("Error", "Failed to save Income.", "error");
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

  const fetchCategory = async () => {
    try {
      const categories = await getIncomeExpenseCategory(3);
      setcategory(categories || []);
    } catch (err) {
      console.error('Failed to load category:', err);
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


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the income permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTransaction(id);
          Swal.fire("Deleted!", "Income deleted successfully.", "success");
          fetchTransaction();
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete income.", "error");
        }
      }
    });
  };

const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const MobileTransactionCard = ({ tran }) => {
  const date = new Date(tran.transactionDate);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return (
    <Box
      sx={{
        display: 'flex',
        padding: 2,
        marginBottom: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        alignItems: 'center',
        backgroundColor: '#fafafa'
      }}
    >
      {/* Date Box */}
      <Box sx={{ textAlign: 'center', marginRight: 2 }}>
        <Typography variant="h5">{day}</Typography>
        <Typography variant="body2">{`${month} ${year}`}</Typography>
      </Box>

      {/* Details Box */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {tran.categoryName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tran.accountName}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          ₹ {tran.amount}
        </Typography>
      </Box>

      {/* Actions */}
      <Box>
        <IconButton color="primary" onClick={() => openDialog(tran)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => handleDelete(tran.transactionId)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};




   return (
    <Box sx={{mt:5,p:2,maxWidth:'90%',mx:'auto'}}> 
      <Typography variant='h4' fontWeight={'bold'} gutterBottom>
         Income
      </Typography>
      <Button variant='contained' sx={{mb:2}} onClick={() =>openDialog()}>
        Add Income
      </Button>
{/* 
       <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction No</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomeTransaction.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No categories added yet.
                </TableCell>
              </TableRow>
            ) : (
              incomeTransaction.map((tran, idx) => (
                <TableRow key={tran.transactionId}>
                  <TableCell>{tran.encodedID}</TableCell>
                  <TableCell>{formatDate(tran.transactionDate)}</TableCell>
                  <TableCell>{tran.categoryName}</TableCell>
                  <TableCell>{tran.accountName}</TableCell>
                  <TableCell>{tran.amount}</TableCell>
                  <TableCell>{formatDateTime(tran.createdDate)}</TableCell>
                  <TableCell align="center">
                      <IconButton
                           color="primary"
                            onClick={() => openDialog(tran)}>
                       <EditIcon />
                        </IconButton>

                      <IconButton color="error" onClick={() => handleDelete(tran.transactionId)}>
                       <DeleteIcon />
                    </IconButton>
                      </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper> */}

<Paper elevation={3} sx={{ padding: isMobile ? 2 : 0 }}>
  {isMobile ? (
    // Mobile View
    incomeTransaction.length === 0 ? (
      <Typography align="center">No categories added yet.</Typography>
    ) : (
      incomeTransaction.map((tran) => (
        <MobileTransactionCard key={tran.transactionId} tran={tran} />
      ))
    )
  ) : (
    // Desktop View
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Transaction No</TableCell>
          <TableCell>Transaction Date</TableCell>
          <TableCell>Category Name</TableCell>
          <TableCell>Account</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Created On</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {incomeTransaction.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} align="center">
              No categories added yet.
            </TableCell>
          </TableRow>
        ) : (
          incomeTransaction.map((tran) => (
            <TableRow key={tran.transactionId}>
              <TableCell>{tran.encodedID}</TableCell>
              <TableCell>{formatDate(tran.transactionDate)}</TableCell>
              <TableCell>{tran.categoryName}</TableCell>
              <TableCell>{tran.accountName}</TableCell>
              <TableCell>{tran.amount}</TableCell>
              <TableCell>{formatDateTime(tran.createdDate)}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => openDialog(tran)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(tran.transactionId)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )}
</Paper>

        
        <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
          <DialogTitle>{editId ? "Edit Income":"Add New Income"}</DialogTitle>
           <DialogContent>

          {/* <TextField
            label="Transaction Date"
            name="transactionDate" // ✅ camelCase to match formData key
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.transactionDate}
            onChange={handleChange}
            /> */}

{/* <TextField
  label="Transaction Date"
  name="transactionDate"
  type="date"
  fullWidth
  margin="normal"
  InputLabelProps={{ shrink: true }}
  value={formData.transactionDate || ""}
  onChange={handleChange}
/> */}

            <DatePicker
              selected={formData.transactionDate}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, transactionDate: date }))
              }
              dateFormat="dd-MM-yyyy"
              customInput={<DatePickerInput label="Transaction Date" />}
              wrapperClassName="full-width-datepicker"
            />

            <FormControl fullWidth sx={{mb:2}}>
              <InputLabel id="group-type-label">Choose Category</InputLabel>
              <Select label="Account Group Type"
              value={slectedCategoryId}
              labelId="group-type-label"
              onChange={handleCategoryChange}
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
              value={selectedAccountId}
              labelId="group-type-label"
              onChange={handleAccountChange}
              >
                {account.map((type)=>(<MenuItem key={type.value} value={type.value}>
                  {type.text}
                  </MenuItem>
                ))
                }
              </Select>
            </FormControl>


             <TextField label="Amount" 
                       name='amount' 
                       fullWidth 
                       autoFocus 
                       margin='normal' 
                       value={formData.amount}
                       onChange={handleChange}/>

            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />

            <TextField
              label="Special Note"
              name="notes"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleChange}
            />
           </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                     <Button onClick={handleClose}>Cancel</Button>
                     <Button
                       variant="contained"
                       onClick={handleSave}
                       disabled={!formData.amount}
                     >
                       Save
                     </Button>
                   </DialogActions>
        </Dialog>
    </Box>
  )
}

export default Income
