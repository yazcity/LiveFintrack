
import React, { useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { Box ,Typography ,Divider, Grid, Paper, TextField, Select, MenuItem, InputLabel, FormControl, Button
        ,Table, TableHead, TableRow, TableCell, TableBody, IconButton
       }  from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAccountGroups ,saveAccountGroup, deleteAccountGroup} from '../../api/AccountGroupApi';
import { getAccountGroupTypes } from '../../api/DropdownApi';
const AccountGroup = () => {

      const [groupName, setGroupName] = useState('');
      const [groupTypes, setGroupTypes] = useState([]);
      const [group, setGroup] = useState([]);
      const [editId, setEditId] = useState(null);
      const [selectedGroupTypeId, setSelectedGroupTypeId] = useState('');
     useEffect(() => {
          fetchGroups();
          fetchGroupTypes();
        }, []);
      

        const fetchGroups = async () => {
          try {
            const data = await getAccountGroups();
            setGroup(data || []);
          } catch (err) {
            Swal.fire('Error', 'Failed to load groups.', 'error');
          }
        };

        const fetchGroupTypes = async () => {
            try {
            const types = await getAccountGroupTypes();
            setGroupTypes(types || []);
            } catch (err) {
            Swal.fire('Error', 'Failed to load group types.', 'error');
        }
        };

        const now = new Date().toISOString();

        const handleSave = async () => {
            if (!groupName.trim()) return;
        
            const payload = {
              AccountgroupId: editId || 0,
              AccountgroupTypeId: selectedGroupTypeId,
              AccountGroupName: groupName.trim(),
              isActive: true, // or false if needed
              createdDate: now,
              updatedDate: now,
            };
        
            try {
              await saveAccountGroup(payload);
              Swal.fire('Success', 'Account group saved successfully.', 'success');
              fetchGroups();
              setGroupName('');
              setEditId(null);
            } catch (err) {
              Swal.fire('Error', 'Failed to save account group.', 'error');
            }
        };

        const handleEdit = (id) => {
          
            const item = group.find(g => g.accountgroupId === id);
            console.log(item);
        
            if (item) {
              setGroupName(item.accountGroupName);
              setEditId(item.accountgroupId);
              setSelectedGroupTypeId(item.accountgroupTypeId)
            }
          };
        
          const handleDelete = (id) => {
            Swal.fire({
              title: 'Are you sure?',
              text: 'This will delete the account group permanently.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  await deleteAccountGroup(id);
                  Swal.fire('Deleted!', 'Account group deleted successfully.', 'success');
                  fetchGroups();
                } catch (err) {
                  Swal.fire('Error', 'Failed to delete account group.', 'error');
                }
              }
            });
          };


  return (
    <Box sx={{ mt: 5, px: 2, width: '100%' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Manage Account Groups
      </Typography>

       <Divider sx={{ mb: 4 }} />
              <Grid container spacing={3} sx={{ width: '100%', mb: 4 }}>
                  <Grid sx={(theme) => ({
                    width: '38%',
                    [theme.breakpoints.down('md')]: { width: '100%' }
                  })}>
                    <Paper sx={{ p: 3 }}>
                             <Typography variant="h6" gutterBottom>
                                      {editId ? 'Edit Account Group' : 'Add New Account Group'}
                              </Typography>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="group-type-label">Account Group Type</InputLabel>
                                    <Select
                                        labelId="group-type-label"
                                        value={selectedGroupTypeId}
                                        label="Account Group Type"
                                        onChange={(e) => setSelectedGroupTypeId(e.target.value)}
                                    >
                                        {groupTypes.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.text}
                                        </MenuItem>
                                        ))}
                                    </Select>
                           </FormControl>
                           <TextField
                                            label="Account Group Type Name"
                                            fullWidth
                                            value={groupName}
                                            onChange={(e) => setGroupName(e.target.value)}
                                            sx={{ mb: 2 }}
                                />

                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleSave}
                            disabled={!groupName.trim() || !selectedGroupTypeId }
                        >
                        {editId ? 'Update' : 'Add'}
                        </Button>
                    </Paper>
                  </Grid>

                          <Grid sx={(theme) => ({
                            width: '60%',
                            [theme.breakpoints.down('md')]: { width: '100%' }
                          })}>
                            <Paper sx={{ p: 3 }}>
                              <Typography variant="h6" gutterBottom>Account Group List</Typography>
                  
                              <Box sx={{ overflowY: 'auto', maxHeight: 500 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {group.length === 0 ? (
                                        <TableRow>
                                        <TableCell colSpan={3}>No accout group found.</TableCell>
                                        </TableRow>
                                    ) : (
                                        group.map((g, idx) => (
                                        <TableRow key={g.accountgroupId}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>{g.accountGroupName}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEdit(g.accountgroupId)}
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(g.accountgroupId)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>


                                        </TableRow>
                                        ))
                                    )}
                                    </TableBody>
                                </Table>

                              </Box>
                              </Paper>
                              </Grid>
              </Grid>

      </Box>
  )
}

export default AccountGroup
