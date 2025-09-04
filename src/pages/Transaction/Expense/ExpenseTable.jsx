import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button,IconButton
} from '@mui/material';
import { formatDate, formatDateTime } from '../../../utils/formatDate';

const ExpenseTableDesktop = ({ data, onEdit, onDelete }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Transaction No</TableCell>
          <TableCell>Transaction Date</TableCell>
          <TableCell>Category Name</TableCell>
          <TableCell>Account</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Created On</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((tran) => (
           <TableRow key={tran.transactionId}>
              <TableCell>{tran.encodedID}</TableCell>
              <TableCell>{formatDate(tran.transactionDate)}</TableCell>
              <TableCell>{tran.categoryName}</TableCell>
              <TableCell>{tran.accountName}</TableCell>
              <TableCell>{tran.amount}</TableCell>
              <TableCell>{formatDateTime(tran.createdDate)}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(tran)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(tran.transactionId)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ExpenseTableDesktop;
