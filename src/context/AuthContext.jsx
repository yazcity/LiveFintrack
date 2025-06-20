// import { createContext, useContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode'; // ✅ Corrected import

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (token) => {
//     localStorage.setItem('token', token);

//       const decoded = jwtDecode(token);
//      console.log('Decoded user:', decoded); 


//     setUser(jwtDecode(token));
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         setUser(jwtDecode(token));
//       } catch (error) {
//         console.error('Invalid token:', error);
//         logout();
//       }
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState, useEffect } from 'react';

// import { CircularProgress, Box, Typography } from '@mui/material';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // optionally validate token here or decode it
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//   };

//   if (isAuthenticated === null) {
//     // Optionally show a loading spinner while auth state is restoring
//     return <div>Loading...</div>;
//   }

//   return (

    
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { CircularProgress, Box, Typography } from '@mui/material';
//  import { jwtDecode } from 'jwt-decode'; // ✅ Corrected import

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//   };

//   if (isAuthenticated === null) {
//     return (
//       <Box
//         sx={{
//           height: '100vh',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           bgcolor: '#f9f9f9',
//         }}
//       >
//         <CircularProgress />
//         <Typography variant="body1" sx={{ mt: 2, color: '#666' }}>
//           Loading authentication...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// src/context/AuthContext.js



import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount or token change, decode token and set user
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Example claims, adjust based on your token
        setUser({
          name: decoded.name || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          id: decoded.sub || decoded.nameid,
          role: decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        });
      } catch (error) {
        console.error('Invalid token', error);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = (jwtToken) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
