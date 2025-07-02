import React, { useState, useEffect } from 'react'
import { getAccountGroupTypes, getAccountGroup } from '../../api/DropdownApi';
import {saveAccount, getAccount, deleteAccount} from '../../api/AccountApi';
import { useLoading } from '../../components/LoadingContext/LoadingContext'; //'  ../components/LoadingContext/LoadingContext';
// import { useWithLoader } from '../../components/LoadingContext/useWithLoader';
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
function Account() {

  const [open ,setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ account: "", amount: 0.0 , description: "", notes: "" , isIncludeInTotal: false });
  const [groupTypes, setGroupTypes] = useState([]);
  const [accountGroup, setAccountGroup] = useState([]);
  const [selectedGroupTypeId, setSelectedGroupTypeId] = useState('');
  const [slectedAccountGroupId, setSlectedAccountGroupId] = useState('');
  const [account,setAccount] =useState([]);

  const { showLoading, hideLoading } = useLoading();

 // const { withLoader } = useWithLoader();

useEffect(() => {
  fetchAccount();
  fetchGroupTypes();
}, []);


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the account permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAccount(id);
          Swal.fire("Deleted!", "Account deleted successfully.", "success");
          fetchAccount();
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete account.", "error");
        }
      }
    });
  };
  const handleClose = () => {
    
    setOpen(false);
    setEditId(null);
  
  }


//   const handleEditOpen = async (accountToEdit) => {
//   setFormData({
//       account: accountToEdit.accountName,
//       amount: accountToEdit.amount,
//       description: accountToEdit.description || "",
//       notes: accountToEdit.note || "",
//       isIncludeInTotal: accountToEdit.isIncludeInTotal || false
//     });
//     setEditId(accountToEdit.accountId);

//     const typeId = accountToEdit.accountgroupTypeId || ''; // 👈 Check this again
//     setSelectedGroupTypeId(typeId);

//     const group = await getAccountGroup(typeId);
//     setAccountGroup(group || []);

//     setSlectedAccountGroupId(accountToEdit.accountgroupId || '');

//     setOpen(true);
//   }


//   const openDialog = (editData = null) => {
//   if (editData) {
//     setEditId(editData.accountId);
//     setFormData({
//       account: editData.accountName,
//       amount: editData.amount,
//       description: editData.description || "",
//       notes: editData.note || "",
//       isIncludeInTotal: editData.isIncludeInTotal || false
//     });
//     setSelectedGroupTypeId(editData.accountgroupTypeId || '');
//     getAccountGroup(editData.accountgroupTypeId).then(group => {
//       setAccountGroup(group || []);
//       setSlectedAccountGroupId(editData.accountgroupId || '');
//     });
//   } else {
//     setEditId(null);
//     setFormData({ account: "", amount: 0.0, description: "", notes: "", isIncludeInTotal: false });
//     setSelectedGroupTypeId('');
//     setSlectedAccountGroupId('');
//     setAccountGroup([]);
//   }
//   setOpen(true);
// };


const openDialog = async (editData = null) => {
  setOpen(true); // Open early to feel responsive
  if (editData) {
    setEditId(editData.accountId);
    setFormData({
      account: editData.accountName,
      amount: editData.amount,
      description: editData.description || "",
      notes: editData.note || "",
      isIncludeInTotal: editData.isIncludeInTotal || false
    });
    setSelectedGroupTypeId(editData.accountgroupTypeId || '');
    
    const group = await getAccountGroup(editData.accountgroupTypeId);
    setAccountGroup(group || []);
    setSlectedAccountGroupId(editData.accountgroupId || '');
  } else {
    setEditId(null);
    setFormData({ account: "", amount: 0.0, description: "", notes: "", isIncludeInTotal: false });
    setSelectedGroupTypeId('');
    setSlectedAccountGroupId('');
    setAccountGroup([]);
  }
};

  const handleChange = (e) =>{
     setFormData((prev) => ({...prev,[e.target.name]: e.target.value}));
  }
  const handleGroupTypeChange = async (e) => {
  const typeId = e.target.value;
   setSelectedGroupTypeId(typeId);
   setAccountGroup([]);
if(typeId){
    const group = await getAccountGroup(typeId);
    //const group = await withLoader(() => getAccountGroup(typeId));
    setAccountGroup(group||[])
} 
else{
  setAccountGroup([]);
  setSlectedAccountGroupId('');
}
   
  }

  const fetchAccount = async () => {
      try {
       // showLoading();
       //  const data = await withLoader(() => getAccount());
        const data = await getAccount();
        setAccount(data || []);
       // hideLoading();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load account.", "error");
      }
  };
  const handleSave = async () => {
   const { account, amount, description, notes, isIncludeInTotal } = formData;
 if (!account.trim()) {
      Swal.fire("Warning", "Account name is required.", "warning");
      return;
    }

    const payload = {
      AccountId: editId || 0,
      AccountName: account.trim(),
      Amount: parseFloat(amount) || 0.0,
      Payable:0.0,
      AccountgroupId: slectedAccountGroupId ? parseInt(slectedAccountGroupId) : 0,
      Description: description.trim(),
      Note: notes.trim(),
      IsIncludeInTotal: isIncludeInTotal,
      IsActive: true
    };

 try {
      await saveAccount(payload);
      handleClose();
      fetchAccount();
      Swal.fire("Success", "Account saved successfully.", "success");
    } catch (err) {
      console.error(err);
      handleClose();
      Swal.fire("Error", "Failed to save Account.", "error");
    }

  }
  const fetchGroupTypes = async () => {
    try {
      const types = await getAccountGroupTypes();
     // const types = await withLoader(() => getAccountGroupTypes());
      setGroupTypes(types || []);
    } catch (err) {
      console.error('Failed to load group types:', err);
    }
  }
  return (
    <Box sx={{mt:5,p:2,maxWidth:'90%',mx:'auto'}}> 
      <Typography variant='h4' fontWeight={'bold'} gutterBottom>
         Account
      </Typography>
      <Button variant='contained' sx={{mb:2}} onClick={() =>openDialog()}>
        Add Account
      </Button>

       <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {account.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No categories added yet.
                </TableCell>
              </TableRow>
            ) : (
              account.map((cat, idx) => (
                <TableRow key={cat.accountId}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{cat.accountName}</TableCell>
                  <TableCell>{cat.amount}</TableCell>
                  <TableCell align="center">
                      <IconButton
                           color="primary"
                            onClick={() => openDialog(cat)}>
                       <EditIcon />
                        </IconButton>

                      <IconButton color="error" onClick={() => handleDelete(cat.accountId)}>
                       <DeleteIcon />
                    </IconButton>
                      </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>


        
        <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
          <DialogTitle>{editId ? "Edit Account":"Add New Account"}</DialogTitle>
           <DialogContent>

            <FormControl fullWidth sx={{mb:2}}>
              <InputLabel id="group-type-label">Account Group Type</InputLabel>
              <Select label="Account Group Type"
              value={selectedGroupTypeId}
              labelId="group-type-label"
              onChange={handleGroupTypeChange}
              >
                {groupTypes.map((type)=>(<MenuItem key={type.value} value={type.value}>
                  {type.text}
                  </MenuItem>
                ))
                }
              </Select>
            </FormControl>

            <FormControl fullWidth disabled={!accountGroup.length}>
              <InputLabel id="account-group-label">Account Group</InputLabel>
              <Select
                labelId="account-group-label"
                value={slectedAccountGroupId}
                label="Account Group"
                onChange={(e) => setSlectedAccountGroupId(e.target.value)}>
                {accountGroup.map((group) => (
                  <MenuItem key={group.value} value={group.value}>
                    {group.text}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>

            <TextField label="Account Name" 
                       name='account' 
                       fullWidth 
                       autoFocus 
                       margin='normal' 
                       value={formData.account}
                       onChange={handleChange}/>

             <TextField label="Amount" 
                       name='amount' 
                       fullWidth 
                       autoFocus 
                       margin='normal' 
                       value={formData.amount}
                       onChange={handleChange}/>

          <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={formData.isIncludeInTotal}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isIncludeInTotal: e.target.checked,
                }))
              }
              style={{ marginRight: '8px' }}
            />
            Include this amount in the total?
          </label>
      </FormControl>

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
                       disabled={!formData.account.trim()}
                     >
                       Save
                     </Button>
                   </DialogActions>
        </Dialog>
    </Box>
  )
}

export default Account
