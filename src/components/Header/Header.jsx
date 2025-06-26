import React, { useState } from 'react';
import {
  Box,
  Typography,
  styled,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CustomButton from '../CustomButton/CustomButton';
import { useAuth } from '../../context/AuthContext'; // Replace with your actual context

const NavBarLink = styled(Link)(() => ({
  fontSize: '15px',
  color: '#4F5361',
  fontWeight: 'bold',
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    color: '#fff',
    textDecoration: 'none',
  },
}));

const NavBarLinksBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
  cursor: 'pointer',
  display: 'none',
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));

const nav_titles = [
  { path: '/', display: 'Dashboard' },
  { path: '/account', display: 'Account' },
  { path: '/services', display: 'Services' },
  { path: '/about', display: 'About Us' },
  { path: '/account-group-types', display: 'Account Group Types' },
  { path: '/account-groups', display: 'Account Groups' },
  { path: '/transaction-categories', display: 'Transaction Categories' },
];

function Header() {
  const [mobileMenu, setMobileMenu] = useState({ left: false });
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const { user, logout } = useAuth();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box>
        <List>
          {nav_titles.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <FeaturedPlayListIcon />}
                  {index === 2 && <MiscellaneousServicesIcon />}
                  {index === 3 && <ContactsIcon />}
                </ListItemIcon>
                <ListItemText primary={item.display} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {user && (
        <Box sx={{ borderTop: '1px solid #e0e0e0', p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Signed in as:
          </Typography>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
            {user.name ||
              user[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
              ] ||
              'User'}
          </Typography>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px',
        backgroundColor: '#FED801',
        marginBottom: '-24px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomMenuIcon onClick={toggleDrawer('left', true)} />
          <Drawer
            anchor="left"
            open={mobileMenu['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
          <Typography
            sx={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem' }}
          >
            FinTrack
          </Typography>
        </Box>

        {/* Desktop Nav Links */}
        <NavBarLinksBox>
          {nav_titles.map((item, index) => (
            <NavBarLink key={index} to={item.path}>
              {item.display}
            </NavBarLink>
          ))}
        </NavBarLinksBox>
      </Box>

      {/* Auth Buttons */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {user ? (
          <>
            <Typography
              sx={{
                fontWeight: 'bold',
                color: '#0F1B4C',
                display: { xs: 'none', md: 'block' },
              }}
            >
              {user.name ||
                user[
                  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
                ] ||
                'User'}
            </Typography>
            {isMobile ? (
              <Tooltip title="Logout">
                <ExitToAppIcon
                  style={{
                    color: '#0F1B4C',
                    fontSize: 30,
                    cursor: 'pointer',
                  }}
                  onClick={handleLogout}
                />
              </Tooltip>
            ) : (
              <CustomButton
                backgroundColor="#0F1B4C"
                color="#fff"
                buttonText="Logout"
                onClick={handleLogout}
              />
            )}
          </>
        ) : (
          <>
            {isMobile ? (
              <>
                <Tooltip title="Sign In">
                  <LockOpenIcon
                    style={{
                      color: '#0F1B4C',
                      fontSize: 30,
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate('/login')}
                  />
                </Tooltip>
                <Tooltip title="Register">
                  <AppRegistrationIcon
                    style={{
                      color: '#0F1B4C',
                      fontSize: 30,
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate('/register')}
                  />
                </Tooltip>
              </>
            ) : (
              <>
                <NavBarLink to="/login">Sign In</NavBarLink>
                <CustomButton
                  backgroundColor="#0F1B4C"
                  color="#fff"
                  buttonText="Register"
                  onClick={() => navigate('/register')}
                />
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Header;
