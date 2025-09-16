import React from 'react';
import {
  Card, CardContent, Typography, Button
  ,Box,
  Divider
} from '@mui/material';

import { formatDate , formatDateTime } from '../../../utils/formatDate';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
  }).format(amount);
};

const EmployeeTableMobile = ({ data, onEdit, onDelete }) => (
  // <>
  //   {data.map((tran) => (
  //     <Card key={tran.transactionId} sx={{ mb: 2 }}>
  //       <CardContent>
  //         <Typography variant="h6">{formatDate(tran.transactionDate)}    -   <strong>{tran.amount}</strong></Typography>
  //         <Typography variant="body2">Category: {tran.categoryName}</Typography>
  //         <Typography variant="body2">Account: {tran.accountName}</Typography>
  //         <Typography variant="body2">Amount: <strong>{tran.amount}</strong></Typography>
  //         <Button size="small" onClick={() => onEdit(tran)} sx={{ mt: 1 }}>Edit</Button>
  //         <Button size="small" color="error" onClick={() => onDelete(tran.transactionId)} sx={{ mt: 1, ml: 1 }}>Delete</Button>
  //       </CardContent>
  //     </Card>
  //   ))}
  // </>
  <>
    {data.map((tran) => (
      <Card key={tran.transactionId} sx={{ mb: 2, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {formatDate(tran.transactionDate)}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'red' }}>
             {formatCurrency(tran.amount)}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <strong>Category:</strong> {tran.categoryName}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Account:</strong> {tran.accountName}
          </Typography>

          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => onEdit(tran)}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => onDelete(tran.transactionId)}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    ))}
  </>

);

export default EmployeeTableMobile;
