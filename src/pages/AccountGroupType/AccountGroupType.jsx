import React, { useState, useEffect } from 'react';
import {
  Box, Grid, TextField, Button, Typography,
  Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Divider, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

import {
  getAccountGroupTypes,
  saveAccountGroupType,
  deleteAccountGroupType
} from '../../api/accountGroupTypeApi'; // Adjust path if necessary

export default function AccountGroupType() {
  const [groupName, setGroupName] = useState('');
  const [groupTypes, setGroupTypes] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGroupTypes();
  }, []);

  const fetchGroupTypes = async () => {
    try {
      const data = await getAccountGroupTypes();
      setGroupTypes(data || []);
    } catch (err) {
      Swal.fire('Error', 'Failed to load group types.', 'error');
    }
  };

  const handleSave = async () => {
    if (!groupName.trim()) return;

    const payload = {
      AccountgroupTypeId: editId || 0,
      AccountGroupTypeName: groupName.trim()
    };

    try {
      await saveAccountGroupType(payload);
      Swal.fire('Success', 'Group type saved successfully.', 'success');
      fetchGroupTypes();
      setGroupName('');
      setEditId(null);
    } catch (err) {
      Swal.fire('Error', 'Failed to save group type.', 'error');
    }
  };

  const handleEdit = (id) => {
  
    console.log(groupTypes);
    const item = groupTypes.find(g => g.accountgroupTypeId === id);
    console.log(item);

    if (item) {
      setGroupName(item.accountGroupTypeName);
      setEditId(item.accountgroupTypeId);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the group type permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAccountGroupType(id);
          Swal.fire('Deleted!', 'Group type deleted successfully.', 'success');
          fetchGroupTypes();
        } catch (err) {
          Swal.fire('Error', 'Failed to delete group type.', 'error');
        }
      }
    });
  };

  return (
    <Box sx={{ mt: 5, px: 2, width: '100%' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Manage Account Group Types
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3} sx={{ width: '100%', mb: 4 }}>
        <Grid sx={(theme) => ({
          width: '38%',
          [theme.breakpoints.down('md')]: { width: '100%' }
        })}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {editId ? 'Edit Group Type' : 'Add New Group Type'}
            </Typography>

            <TextField
              label="Group Type Name"
              fullWidth
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSave}
              disabled={!groupName.trim()}
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
            <Typography variant="h6" gutterBottom>Group Type List</Typography>

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
                  {groupTypes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3}>No group types found.</TableCell>
                    </TableRow>
                  ) : (
                    groupTypes.map((g, idx) => (
                      <TableRow key={g.accountgroupTypeId}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{g.accountGroupTypeName}</TableCell>
                        <TableCell align="center">
                            <IconButton
                                color="primary"
                                onClick={() => handleEdit(g.accountgroupTypeId)}
                                disabled={!g.isDeletable}
                            >
                                <EditIcon />
                            </IconButton>

                            <IconButton
                                color="error"
                                onClick={() => handleDelete(g.accountgroupTypeId)}
                                disabled={!g.isDeletable}
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
  );
}
