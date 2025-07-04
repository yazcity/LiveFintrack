import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button
} from '@mui/material';

const EmployeeTableDesktop = ({ data, onEdit, onDelete }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((emp) => (
          <TableRow key={emp.id}>
            <TableCell>{emp.name}</TableCell>
            <TableCell>{emp.department}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>
              <Button size="small" onClick={() => onEdit(emp)}>Edit</Button>
              <Button size="small" color="error" onClick={() => onDelete(emp.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default EmployeeTableDesktop;
