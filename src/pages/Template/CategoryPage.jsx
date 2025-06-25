import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Divider,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

export default function CategoryPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleAddCategory = () => {
    if (!categoryName.trim()) return;

    if (editId) {
      // Update existing category
      setCategories(prev =>
        prev.map(cat => (cat.id === editId ? { ...cat, name: categoryName.trim() } : cat))
      );
      setEditId(null);
    } else {
      // Add new category
      setCategories(prev => [...prev, { id: Date.now(), name: categoryName.trim() }]);
    }

    setCategoryName('');
  };

  const handleEdit = (id) => {
    const cat = categories.find(c => c.id === id);
    if (cat) {
      setCategoryName(cat.name);
      setEditId(cat.id);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setCategories(prev => prev.filter(cat => cat.id !== id));
        Swal.fire('Deleted!', 'Category has been deleted.', 'success');
      }
    });
  };

  return (
    <Box sx={{ mt: 5, px: 2, width: '100%' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Manage Categories
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3} sx={{ width: '100%', mb: 4 }}>
        <Grid
          sx={(theme) => ({
            width: '38%',
            [theme.breakpoints.down('md')]: {
              width: '100%',
            },
          })}
        >
          <Paper sx={{ p: 3, width: '100%', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              {editId ? 'Edit Category' : 'Add New Category'}
            </Typography>

            <TextField
              label="Category Name"
              fullWidth
              variant="outlined"
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleAddCategory}
              disabled={!categoryName.trim()}
            >
              {editId ? 'Update Category' : 'Add Category'}
            </Button>
          </Paper>
        </Grid>

        <Grid
          sx={(theme) => ({
            width: '60%',
            [theme.breakpoints.down('md')]: {
              width: '100%',
            },
          })}
        >
          <Paper sx={{ p: 3, width: '100%', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Category List
            </Typography>

            <Box sx={{ width: '100%', overflowY: 'auto', maxHeight: 500 }}>
              <Table stickyHeader sx={{ minWidth: 400 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3}>No categories added yet.</TableCell>
                    </TableRow>
                  ) : (
                    categories.map((cat, index) => (
                      <TableRow key={cat.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{cat.name}</TableCell>
                        <TableCell align="center">
                          <IconButton color="primary" onClick={() => handleEdit(cat.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDelete(cat.id)}>
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
