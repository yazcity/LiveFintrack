import React from 'react';
import {
  Card, CardContent, Typography, Button
} from '@mui/material';

const EmployeeTableMobile = ({ data, onEdit, onDelete }) => (
  <>
    {data.map((emp) => (
      <Card key={emp.id} sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{emp.name}</Typography>
          <Typography variant="body2">Dept: {emp.department}</Typography>
          <Typography variant="body2">Email: {emp.email}</Typography>
          <Button size="small" onClick={() => onEdit(emp)} sx={{ mt: 1 }}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(emp.id)} sx={{ mt: 1, ml: 1 }}>Delete</Button>
        </CardContent>
      </Card>
    ))}
  </>
);

export default EmployeeTableMobile;
