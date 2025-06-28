import React, { useState, useEffect } from 'react'
import { getAccountGroupTypes, getAccountGroup } from '../../api/DropdownApi';
import {saveAccount, getAccount} from '../../api/AccountApi';
import { useLoading } from '../../components/LoadingContext/LoadingContext'; //'  ../components/LoadingContext/LoadingContext';
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

useEffect(() => {
  fetchAccount();
  fetchGroupTypes();
}, []);

// useEffect(() => {
//   const fetchAllData = async () => {
//     try {
//       showLoading();
//       const [accounts, types] = await Promise.all([
//         getAccount(),
//         getAccountGroupTypes()
//       ]);
//       setAccount(accounts || []);
//       setGroupTypes(types || []);
//     } catch (err) {
//       console.error('Failed to fetch data:', err);
//       Swal.fire("Error", "Failed to load data.", "error");
//     } finally {
//       hideLoading();
//     }
//   };

//   fetchAllData();
// }, []);


const handleEdit = async (id) => {
  const accountToEdit = account.find((a) => a.accountId === id);

  console.log('Account to edit:', accountToEdit);
  if (accountToEdit) {
    setFormData({
      account: accountToEdit.accountName,
      amount: accountToEdit.amount,
      description: accountToEdit.description || "",
      notes: accountToEdit.note || "",
      isIncludeInTotal: accountToEdit.isIncludeInTotal || false
    });

    setEditId(id);
    setSelectedGroupTypeId(accountToEdit.accountgroupTypeId || '');

    // Fetch group based on group type
      const group = await getAccountGroup(accountToEdit.accountgroupTypeId);
      setAccountGroup(group || []);

     setSlectedAccountGroupId(accountToEdit.accountgroupId || '');

    handleOpen();
  }
};

const handleDelete = async (id) => {

}
  const handleClose = () => {setOpen(false);}
  const handleOpen = () => {
  // Reset dropdowns when adding new
  if (!editId) {
    setSelectedGroupTypeId('');
    setAccountGroup([]);
    setSlectedAccountGroupId('');
    setFormData({ account: "", amount: 0.0 , description: "", notes: "", isIncludeInTotal: false });
  }
  setOpen(true);
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
    setAccountGroup(group||[])
} 
else{
  setAccountGroup([]);
  setSlectedAccountGroupId('');
}
   
  }


    const fetchAccount = async () => {
      try {
         showLoading();
        const data = await getAccount();
        setAccount(data || []);
        hideLoading();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load categories.", "error");
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
      <Button variant='contained' sx={{mb:2}} onClick={handleOpen}>
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
                            onClick={() => handleEdit(cat.accountgroupId)}>
                       <EditIcon />
                        </IconButton>

                      <IconButton color="error" onClick={() => handleDelete(cat.accountgroupId)}>
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
