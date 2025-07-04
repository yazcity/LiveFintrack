import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const EmployeeFormDialog = ({ open, onClose, onSave, employee }) => {
  const [form, setForm] = useState({ name: '', department: '', email: '' });

  useEffect(() => {
    setForm(employee || { name: '', department: '', email: '' });
  }, [employee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({ ...employee, ...form });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{employee ? 'Edit' : 'Add'} Employee</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Name" name="name" value={form.name} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Department" name="department" value={form.department} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Email" name="email" value={form.email} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeFormDialog;
