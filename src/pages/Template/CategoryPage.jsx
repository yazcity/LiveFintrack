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
} from '@mui/material';

export default function CategoryPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const handleAddCategory = () => {
    if (!categoryName.trim()) return;
    setCategories(prev => [...prev, { id: Date.now(), name: categoryName.trim() }]);
    setCategoryName('');
  };

  return (
    <Box sx={{ mt: 5, px: 2, width: '100%' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Manage Categories
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3} sx={{ width: '100%' }}>
        <Grid item xs={12} sm={12} md={6} xl={6}>
          <Paper sx={{ p: 3, width: '100%', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Add New Category
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
              Add Category
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} xl={6}>
          <Paper sx={{ p: 3, width: '100%', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Category List
            </Typography>

            <Box sx={{ width: '100%', overflowX: 'auto' }}>
              <Table sx={{ minWidth: 400 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Category Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2}>No categories added yet.</TableCell>
                    </TableRow>
                  ) : (
                    categories.map((cat, index) => (
                      <TableRow key={cat.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{cat.name}</TableCell>
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
