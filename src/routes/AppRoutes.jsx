import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Auth/LoginPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import Dashboard1 from '../pages/Dashboard/Dasboard1';
import Dashboard2 from '../pages/Dashboard/Dashboard2';
import Register from '../pages/Auth/Register';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Box } from '@mui/material';
import AuthPage from '../pages/Auth/AuthPage';
import LoginPage from '../pages/Auth/LoginPage';
import WelcomeLayout from '../components/Layout/WelcomeLayout';
import CategoryPage from '../pages/Template/CategoryPage';
import AddCategoryWithDialog from '../pages/Template/AddCategoryWithDialog';
import AccountGroupType from '../pages/AccountGroupType/AccountGroupType';
import AccountGroup from '../pages/AccountGroup/AccountGroup';
import TransactionCategories from '../pages/TransactionCategories/TransactionCategories';
import Account from '../pages/Account/Account';
import Income from '../pages/Transaction/Income/Income';
import Expense from '../pages/Transaction/Expense/Expense';


export default function AppRoutes() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Full screen height
      }}
    >
      <Header />

      <Box sx={{ flexGrow: 1 }}> {/* This is the main content area */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard1 />} />
              <Route path="/dashboard1" element={<Dashboard2 />} />
              <Route path="/category" element={<CategoryPage/>} />
              <Route path='dialog' element= {<AddCategoryWithDialog/>}/>
              <Route path='account-group-types' element= {<AccountGroupType/>}/>
              <Route path='transaction-categories' element= {<TransactionCategories/>}/>
              <Route path='account-groups' element= {<AccountGroup/>}/>
              <Route path='account' element= {<Account/>}/>
              <Route path='income' element= {<Income/>}/>
              <Route path='expense' element= {<Expense/>}/>
            <Route path="/" element={<Dashboard />} />
           <Route path="/LiveFintrack" element={<Dashboard />} />
            
          </Route>
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}
