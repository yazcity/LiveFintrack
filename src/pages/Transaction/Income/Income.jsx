import React, { useState, useEffect } from 'react'
import { getAccounts, getIncomeExpenseCategory } from '../../../api/DropdownApi';
import {saveTransaction, getTransaction, deleteAccount} from '../../../api/TransactionApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import { Box ,Button,Typography, Dialog, DialogTitle, DialogContent, TextField, FormControl,
   InputLabel, Select, MenuItem, DialogActions
  ,Paper,TableCell,
  TableRow,
  TableBody,
  IconButton,
  TableHead,
  Table } from '@mui/material' 

function Income() {


      const [open ,setOpen] = useState(false);
      const [editId, setEditId] = useState(null);
      const [formData, setFormData] = useState({transactionId : 0,transactionDate: new Date().toISOString().split('T')[0], accountId: 0, categoryId: 0, amount: 0.0, description: "", notes: "" });
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
    setOpen(true); 
    if (editData) {
      setEditId(editData.transactionId);
      setFormData({
        accountId: editData.accountId,
        categoryId: editData.categoryId,
        amount: editData.amount,
        description: editData.description || "",
        notes: editData.note || ""
      });
     
    } else {
      setEditId(null);
      setFormData({ transactionId:0, accountId: 0, categoryId: 0, amount: 0.0, description: "", notes: "" });
     
    }
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

      console.log(payload);
  
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
    



   return (
    <Box sx={{mt:5,p:2,maxWidth:'90%',mx:'auto'}}> 
      <Typography variant='h4' fontWeight={'bold'} gutterBottom>
         Income
      </Typography>
      <Button variant='contained' sx={{mb:2}} onClick={() =>openDialog()}>
        Add Income
      </Button>

       <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction No</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Created On</TableCell>
              <TableCell>Account Name</TableCell>
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
                  <TableCell>{tran.transactionDate}</TableCell>
                  <TableCell>{tran.amount}</TableCell>
                  <TableCell>{tran.categoryName}</TableCell>
                  <TableCell>{tran.createdDate}</TableCell>
                  <TableCell>{tran.accountName}</TableCell>
                  <TableCell align="center">
                      {/* <IconButton
                           color="primary"
                            onClick={() => openDialog(cat)}>
                       <EditIcon />
                        </IconButton>

                      <IconButton color="error" onClick={() => handleDelete(cat.accountId)}>
                       <DeleteIcon />
                    </IconButton> */}
                      </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>


        
        <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
          <DialogTitle>{editId ? "Edit Income":"Add New Income"}</DialogTitle>
           <DialogContent>

          <TextField
            label="Transaction Date"
            name="transactionDate" // ✅ camelCase to match formData key
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.transactionDate}
            onChange={handleChange}
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
