import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';

import {saveTransaction, getTransaction, deleteTransaction} from '../../../api/TransactionApi';

import EmployeeFormDialog from './ExpenseDialog';
import EmployeeFormMobile from './ExpenseFormMobile';
import ExpenseTableDesktop from './ExpenseTable';
import EmployeeTableMobile from './ExpenseTableMobile';


const initialData = [
  { id: 1, name: 'John Doe', department: 'HR', email: 'john@company.com' },
  { id: 2, name: 'Jane Smith', department: 'IT', email: 'jane@company.com' },
  { id: 3, name: 'Ahammed Yaseen', department: 'IT', email: 'yazcity@cu.ac.ae' },
];

const Expense = () => {
  const [employees, setEmployees] = useState(initialData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [mode, setMode] = useState('list'); // 'list', 'add', 'edit'
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
          fetchTransaction();

     }, []);


   const [expenseTransaction, setExpenseTransaction] =useState([]);

    const fetchTransaction = async () => {
        try {
          const data = await getTransaction(5);
          setExpenseTransaction(data || []);
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to load transaction.", "error");
        }
    };



  const handleSave = (emp) => {
    if (emp.id) {
      setEmployees(prev => prev.map(e => (e.id === emp.id ? emp : e)));
    } else {
      setEmployees(prev => [...prev, { ...emp, id: Date.now() }]);
    }
    setMode('list');
  };

  const handleDelete = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setMode('edit');
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setMode('add');
  };

  return (
    <Box sx={{ p: 2,mt:3 }}>
      {/* Desktop: Always show table + Add Button */}
      {!isMobile && (
        <>
          <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>
            Add Expense
          </Button>
          <ExpenseTableDesktop
            data={expenseTransaction}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {(mode === 'edit' || mode === 'add') && (
            <EmployeeFormDialog
              open={true}
              onClose={() => setMode('list')}
              onSave={handleSave}
              employee={mode === 'edit' ? selectedEmployee : null}
            />
          )}
        </>
      )}

      {/* Mobile: conditionally render list or form */}
      {isMobile && mode === 'list' && (
        <>
          <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>
            Add Employee
          </Button>
          <EmployeeTableMobile
            data={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}

      {isMobile && (mode === 'add' || mode === 'edit') && (
        <EmployeeFormMobile
          employee={mode === 'edit' ? selectedEmployee : null}
          onClose={() => setMode('list')}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default Expense
