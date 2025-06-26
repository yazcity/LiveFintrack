import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export default function CategoryManager() {
  const [open, setOpen] = useState(false); // for Add/Edit dialog
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ category: "", description: "" });
  const [editId, setEditId] = useState(null);

  // Open Add dialog
  const handleAddOpen = () => {
    setFormData({ category: "", description: "" });
    setEditId(null);
    setOpen(true);
  };

  // Open Edit dialog
  const handleEditOpen = (cat) => {
    setFormData({ category: cat.category, description: cat.description });
    setEditId(cat.id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!formData.category.trim() || !formData.description.trim()) return;

    if (editId) {
      // Update existing
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editId ? { ...cat, ...formData } : cat
        )
      );
    } else {
      // Add new
      setCategories((prev) => [...prev, { id: Date.now(), ...formData }]);
    }

    setOpen(false);
  };

  // SweetAlert2 delete confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5, px: 2 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Categories
      </Typography>

      <Button variant="contained" onClick={handleAddOpen} sx={{ mb: 2 }}>
        Add Category
      </Button>

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No categories added yet.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat, idx) => (
                <TableRow key={cat.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{cat.category}</TableCell>
                  <TableCell>{cat.description}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditOpen(cat)}
                      aria-label="edit"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(cat.id)}
                      aria-label="delete"
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
          <Box sx={{ mt: 1 }}>
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              autoFocus
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={
              !formData.category.trim()
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
