import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Paper,
  TableHead,
  Table,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

import {
  getTransactionCategory,
  saveTransactionCategory,
  deleteTransactionCategory,
} from "../../api/TransactionCategoriesApi";
import { getIncomeExpenseTypes } from '../../api/DropdownApi';
const TransactionCategories = () => {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ category: "", selectedTypeId: "" });
  
  const [types, setTypes] = useState([]);
  const [transactionCategories, setTransactionCategories] = useState([]);

  // Fetch Types and Categories on Mount
  useEffect(() => {
    fetchTypes();
    fetchCategories();
  }, []);

  const fetchTypes = async () => {
    try {
      const data = await getIncomeExpenseTypes();
      setTypes(data || []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load types.", "error");
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getTransactionCategory();
      setTransactionCategories(data || []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load categories.", "error");
    }
  };

  const handleAddOpen = () => {
    setFormData({ category: "", selectedTypeId: "" });
    setEditId(null);
    setOpen(true);
  };

  const handleEditOpen = (category) => {
    setFormData({
      category: category.categoryName,
      selectedTypeId: category.typeId,
    });
    setEditId(category.categoryId);
    setOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the category permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTransactionCategory(id);
          Swal.fire("Deleted!", "Category deleted successfully.", "success");
          fetchCategories();
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete category.", "error");
        }
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const { category, selectedTypeId } = formData;

    if (!category.trim()) {
      Swal.fire("Warning", "Category name is required.", "warning");
      return;
    }

    if (!selectedTypeId) {
      Swal.fire("Warning", "Please select a category type.", "warning");
      return;
    }

    const payload = {
      CategoryId: editId || 0,
      TypeId: selectedTypeId,
      CategoryName: category.trim(),
    };

    try {
      await saveTransactionCategory(payload);
      handleClose();
      fetchCategories();
      Swal.fire("Success", "Category saved successfully.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save category.", "error");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5, px: 2 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Manage Income Expense Categories
      </Typography>

      <Button variant="contained" onClick={handleAddOpen} sx={{ mb: 2 }}>
        Add Category
      </Button>

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No categories added yet.
                </TableCell>
              </TableRow>
            ) : (
              transactionCategories.map((cat, idx) => (
                <TableRow key={cat.categoryId}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{cat.typeName}</TableCell>
                  <TableCell>{cat.categoryName}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditOpen(cat)}
                      aria-label={`Edit ${cat.categoryName}`}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(cat.categoryId)}
                      aria-label={`Delete ${cat.categoryName}`}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? "Edit Category" : "Add New Category"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            autoFocus
            margin="normal"
          />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Category Type</FormLabel>
            <RadioGroup
              name="selectedTypeId"
              value={formData.selectedTypeId}
              onChange={handleChange}
            >
              {types.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.text}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.category.trim() || !formData.selectedTypeId}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionCategories;
