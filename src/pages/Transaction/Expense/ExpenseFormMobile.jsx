import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Button, Typography, IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const EmployeeFormMobile = ({ onClose, onSave, employee }) => {
  const [form, setForm] = useState({ name: '', department: '', email: '' });

  useEffect(() => {
    setForm(employee || { name: '', department: '', email: '' });
  }, [employee]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = () => {
    if (form.name && form.email) {
      onSave({ ...employee, ...form });
    }
  };

  return (
    <Box sx={{
      p: 2,
      minHeight: '100vh',
      backgroundColor: '#fafafa',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={onClose}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          {employee ? 'Edit' : 'Add'} Employee
        </Typography>
      </Box>

      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Department"
        name="department"
        value={form.department}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Save
        </Button>
        <Button fullWidth sx={{ mt: 1 }} onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeFormMobile;
