// // import {styled} from '@mui/system';
// import { Box, Typography ,styled} from '@mui/material'
// import React from 'react'
// import CustomButton from '../CustomButton/CustomButton'
// //import logoImage from '../../assets/logo.png'

// import MenuIcon from '@mui/icons-material/Menu';
// import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
// import MiscellaneousServicesIcon  from '@mui/icons-material/MiscellaneousServices';
// import HomeIcon from "@mui/icons-material/Contacts";
// import ContactsIcon from "@mui/icons-material/Contacts";
// import {
//     Drawer,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemIcon,
//     ListItemText
// } from "@mui/material";

// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom'; // it is a hook like our <Link/>


// function Header() {

//     const [mobileMenu,setMobileMenu] = useState({ left:false })

//     const navigate = useNavigate()

//     const toogleDrawer = (anchor, open)=>(event)=>{
//         if((event.type === "keydown") && (event.type === "Tab" || event.type === "Shift")){
//             return;
//         }

//         setMobileMenu({...mobileMenu,[anchor]:open})
//     }

//     const list= (anchor) =>(
//    <Box sx={{
//         width:anchor === "top" || anchor === "bottom" ? "auto":250
//    }}
//    role="presentation"
//    onClick={toogleDrawer(anchor,false)}
//    onKeyDown = {toogleDrawer(anchor,false)}
//    >     
//     <List>
//      {
//         nav_titles.map((item,index)=>(
//         <ListItem key={index} disablePadding onClick={()=>navigate(item.path)}>
//             <ListItemButton>
//                 <ListItemIcon>
//                  {
//                     index === 0 && <HomeIcon/>
//                  }
//                   {
//                     index === 1 && <FeaturedPlayListIcon/>
//                  }
//                   {
//                     index === 2 && <MiscellaneousServicesIcon/>
//                  }
//                   {
//                     index === 3 && <ContactsIcon/>
//                  }
//                 </ListItemIcon>
//                 <ListItemText primary={item.display}/>
//             </ListItemButton>
//         </ListItem>
//           ))
//      }
//     </List>
//   </Box>
//     )

//     const nav_titles = [
//         {
//             path:'/',
//             display:"Dashboard"
//             // ,HomeIcon:<HomeIcon/>

//         },
//         {
//             path:'/account',
//             display:"Account"
//         },
//         {
//             path:'/services',
//             display:"Services"
//         },
//         {
//             path:'/about',
//             display:"About Us"
//         }
//     ]

//     const NavBarLinksBox = styled(Box)(({theme})=>({
//         display:'flex',
//         alignItems:'center',
//         justifyContent:'center',
//         gap:theme.spacing(3),
//         [theme.breakpoints.down("md")]:{
//             display:'none'
//         }
//     }))

//     const NavBarLink = styled(Link)(() => ({
//   fontSize: '15px',
//   color: '#4F5361',
//   fontWeight: 'bold',
//   cursor: 'pointer',
//   textDecoration: 'none',
//   '&:hover': {
//     color: '#fff',
//     textDecoration: 'none',
//   },
// }));



//     const NavBarLogo = styled("img")(({theme})=>({
//         cursor:'pointer',
//         [theme.breakpoints.down("md")]:{
//             display:"none",
//         },
//     }))

//        const CustomMenuIcon = styled(MenuIcon)(({theme})=>({
//         cursor:'pointer',
//         display:'none',
//         marginRight:theme.spacing(2),

//         [theme.breakpoints.down("md")]:{
//             display:"block",
//         },
//     }))


//   return (
//     <Box 
//      sx={{
//         display:'flex',
//         alignItems:'center',
//         justifyContent:'space-between',
//         padding:'40px',
//         maxWidth:'auto',
//         backgroundColor:'#FED801',
//         marginLeft:'0px',
//         marginBottom:'-24px'
//      }}
//     >
//         <Box  
//             sx={{
//         display:'flex',
//         alignItems:'center',
//         justifyContent:'center',
//         gap:'2.5rem'

//      }}>

//       <Box  sx={{
//         display:'flex',
//         alignItems:'center'
//         }}> 

//        <CustomMenuIcon onClick={toogleDrawer("left",true)}/>

//        <Drawer anchor='left' 
//                open={mobileMenu["left"]} 
//                onClose={toogleDrawer("left",false)}>
//                 { list("left") }
//        </Drawer>
        
// <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem' }}>
//   FinTrack
// </Typography>


//        {/* <NavBarLogo src={logoImage} alt='alt'/> */}
//       </Box>

//             <NavBarLinksBox>
//                 {
//                     nav_titles.map((item,index)=>(
//                     <NavBarLink key={index} variant='body2' onClick={()=>navigate(item.path)}>
//                         {item.display}
//                     </NavBarLink>
//                     ))
//                 }
//             </NavBarLinksBox>
//         </Box>
//         <Box 
//         sx={{
//         display:'flex',
//         alignItems:'center',
//         justifyContent:'center',
//         gap:'1rem'
//         }}
//         >
// <NavBarLink to="/login">
//   Sign Up
// </NavBarLink>
//              <CustomButton backgroundColor='#0F1B4C' color='#fff' buttonText="Register" onClick={() => navigate('/register')}/>
//         </Box>
//     </Box>
//   )
// }

// export default Header


import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
import MenuIcon from '@mui/icons-material/Menu';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import HomeIcon from "@mui/icons-material/Contacts";
import ContactsIcon from "@mui/icons-material/Contacts";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Tooltip } from '@mui/material';

import { useMediaQuery } from '@mui/material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // import your auth hook

function Header() {
  const [mobileMenu, setMobileMenu] = useState({ left: false });
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)'); 
  // Get user and logout from your auth context
  const { user, logout } = useAuth();

  const toggleDrawer = (anchor, open) => (event) => {
    if ((event.type === "keydown") && (event.type === "Tab" || event.type === "Shift")) {
      return;
    }
    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

//   const list = (anchor) => (
//     <Box
//       sx={{
//         width: anchor === "top" || anchor === "bottom" ? "auto" : 250
//       }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//                {user && (
//       <Box sx={{ mt: "auto", p: 2, borderTop: "1px solid #e0e0e0" }}>
//         <Typography variant="body2" color="text.secondary">
//           Signed in as:
//         </Typography>
//         <Typography variant="subtitle2" fontWeight="bold">
//           {user.name || user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "User"}
//         </Typography>
//       </Box>
//     )}
//       <List>
//         {
//           nav_titles.map((item, index) => (
//             <ListItem key={index} disablePadding onClick={() => navigate(item.path)}>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {
//                     index === 0 && <HomeIcon />
//                   }
//                   {
//                     index === 1 && <FeaturedPlayListIcon />
//                   }
//                   {
//                     index === 2 && <MiscellaneousServicesIcon />
//                   }
//                   {
//                     index === 3 && <ContactsIcon />
//                   }

//                 </ListItemIcon>
//                 <ListItemText primary={item.display} />
//               </ListItemButton>
//             </ListItem>
//           ))
          
//         }
//          {user && (
//             <ListItemButton onClick={handleLogout}>
//                 <ListItemIcon >
//                   {
//                     <HomeIcon />
//                   }

//                 </ListItemIcon>
//                 <ListItemText primary="logout" />
//               </ListItemButton>
//     )}
//       </List>

//     </Box>
//   );
const list = (anchor) => (
  <Box
    sx={{
      width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
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
          <ListItem key={index} disablePadding onClick={() => navigate(item.path)}>
            <ListItemButton>
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

    {/* Footer with user info and logout */}
    {user && (
      <Box sx={{ borderTop: "1px solid #e0e0e0", p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Signed in as:
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
          {user.name || user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "User"}
        </Typography>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <HomeIcon /> {/* You can replace with LogoutIcon */}
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Box>
    )}
  </Box>
);

  const nav_titles = [
    {
      path: '/',
      display: "Dashboard"
    },
    {
      path: '/account',
      display: "Account"
    },
    {
      path: '/services',
      display: "Services"
    },
    {
      path: '/about',
      display: "About Us"
    }
  ];

  const NavBarLinksBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: 'none'
    }
  }));

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

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: 'pointer',
    display: 'none',
    marginRight: theme.spacing(2),

    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px',
        maxWidth: 'auto',
        backgroundColor: '#FED801',
        marginLeft: '0px',
        marginBottom: '-24px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem'

        }}
      >

        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>

          <CustomMenuIcon onClick={toggleDrawer("left", true)} />

          <Drawer anchor='left'
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}>
            {list("left")}
          </Drawer>

          <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem' }}>
            FinTrack
          </Typography>
        </Box>

        <NavBarLinksBox>
          {
            nav_titles.map((item, index) => (
              <NavBarLink key={index} variant='body2' onClick={() => navigate(item.path)}>
                {item.display}
              </NavBarLink>
            ))
          }

        </NavBarLinksBox>

 
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}
      >
        {user ? (
          <>
          <Typography
            sx={{
                fontWeight: 'bold',
                color: '#0F1B4C',
                display: { xs: 'none', md: 'block' } // 👈 Hides on xs/sm, shows on md and up
            }}
            >
            {user.name || user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "User"}
            </Typography>

            {/* <Typography sx={{ fontWeight: 'bold', color: '#0F1B4C' }}>
              {user.name || user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "User"}
            </Typography> */}
           
            {/* <CustomButton  sx={{
                display: { xs: 'none', md: 'block' } // 👈 Hides on xs/sm, shows on md and up
            }}
              backgroundColor='#0F1B4C'
              color='#fff'
              buttonText="Logout"
              onClick={handleLogout}
            /> */}

             {/* Logout */}
      {isMobile ? (
        <Tooltip title="Logout">
          <ExitToAppIcon
            style={{ color: '#0F1B4C', fontSize: 30, cursor: 'pointer' }}
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
            {/* <NavBarLink  to="/login">
              Sign In
            </NavBarLink> */}

             {/* Sign In */}
      {isMobile ? (
        <Tooltip title="Sign In">
          <LockOpenIcon
            style={{ color: '#0F1B4C', fontSize: 30, cursor: 'pointer', marginRight: 16 }}
            onClick={() => navigate('/login')}
          />
        </Tooltip>
      ) : (
            <NavBarLink  to="/login">
              Sign In
            </NavBarLink>
      )}

             {isMobile ? (
        <AppRegistrationIcon
          style={{ color: '#0F1B4C', fontSize: 30, cursor: 'pointer' }}
          onClick={() => navigate('/register')}
        />
      ) : (
        <CustomButton
          backgroundColor="#0F1B4C"
          color="#fff"
          buttonText="Register"
          onClick={() => navigate('/register')}
        />
      )}

            {/* <CustomButton backgroundColor='#0F1B4C' color='#fff' buttonText="Register" onClick={() => navigate('/register')} /> */}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Header;
