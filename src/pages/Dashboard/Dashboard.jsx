// src/pages/Dashboard.jsx

import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Button, Typography ,Box, Container, styled} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../../components/CustomCard/CustomCard';
// import { Data } from '../../StaticData/Data';
import Food1 from '../../assets/Food1.jpg';
import Food2 from '../../assets/Food2.jpg';
import Food3 from '../../assets/Food3.jpeg';


import { RiCarLine, RiAlertLine, RiRouteLine, RiTimeLine } from 'react-icons/ri';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Avatar
} from '@mui/material';
import { ArrowUpward, ArrowDownward, SwapHoriz, Logout } from '@mui/icons-material';


 const Data = [
    {
        id: "1",
        img: Food1,
        price: "3500",
        item: "Combo Dishes",
        likes: 2,
        heart: 2,
        share: 2000,
    },
    {
        id: "2",
        img: Food2,
        price: "3800",
        item: "London Popcorn",
        likes: 3,
        heart: 2,
        share: 2300,
    },
    {
        id: "3",
        img: Food3,
        price: "4700",
        item: "Shawarma Plate",
        likes: 4,
        heart: 3,
        share: 3000,
    },
]


const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleLogout = () => {
    logout();
    navigate('/login'); // ✅ Redirect to login after logout
  };


      const DishesBox = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
        marginTop: theme.spacing(5),
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItem: "center",
        },
    }));

    const PropertoiesTextBox = styled(Box)(({ theme }) =>({
        [theme.breakpoints.down("md")]: {
            textAlign: "center",
        },
    }));


    const cardData = [
  {
    icon: <RiCarLine />,
    count: 42,
    title: 'On route vehicles',
    percentage: '+18.2%',
    status: 'than last week',
    color: 'primary',
  },
  {
    icon: <RiAlertLine />,
    count: 8,
    title: 'Vehicles with errors',
    percentage: '-8.7%',
    status: 'than last week',
    color: 'warning',
  },
  {
    icon: <RiRouteLine />,
    count: 27,
    title: 'Deviated from route',
    percentage: '+4.3%',
    status: 'than last week',
    color: 'error',
  },
  {
    icon: <RiTimeLine />,
    count: 13,
    title: 'Late vehicles',
    percentage: '+2.5%',
    status: 'than last week',
    color: 'info',
  },
];


  return (
    // <div style={{ padding: 20 }}>
    //   <Typography variant="h4">
    //     Welcome, {user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || user?.nameid}
    //   </Typography>
    //   <Button
    //     variant="contained"
    //     color="secondary"
    //     onClick={handleLogout}
    //     sx={{ mt: 2 }}
    //   >
    //     Logout
    //   </Button>



    // </div>

    //     <Box sx={{ mt: 5, backgroundColor: "#F5FAFE" , py: 10}}>
    //     <Container>
    //         <PropertoiesTextBox>
    //            <Typography sx ={{color: "#000339", fontSize: "35px", fontWeight: "bold", ml:"13px" }}>
    //            Take Control of Your Finances with Ease.
    //            </Typography>
    //            <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 1,ml:"13px" }}>
    //              Track income, expenses, and budgets with ease for smarter financial decisions.
    //            </Typography>
    //         </PropertoiesTextBox>
    //         <DishesBox>
    //             {Data.map((foodItem) => (
    //                 <CustomCard
    //                   key={foodItem.id}
    //                   img={foodItem.img}
    //                   price={foodItem.price}
    //                   item={foodItem.price}
    //                   likes={foodItem.likes}
    //                   heart={foodItem.heart}
    //                   share={foodItem.share}/>
    //             ))}
    //         </DishesBox>
    //     </Container>

        
    //        <Box style={{ padding: 20 }}>
    //    <Typography variant="h4">
    //      Welcome, {user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || user?.nameid}
    //    </Typography>
    //    <Button
    //      variant="contained"
    //      color="secondary"
    //     onClick={handleLogout}
    //     sx={{ mt: 2 }}
    //   >
    //      Logout
    //   </Button>



    //  </Box>
    // </Box>
//  <Box sx={{ mt: 5, backgroundColor: "#F5FAFE", py: 10 }}>
//       <Container maxWidth="lg">

//         {/* Header */}
//         <Box sx={{ mb: 5, textAlign: "center" }}>
//           <Typography sx={{ color: "#000339", fontSize: "36px", fontWeight: 700 }}>
//             Take Control of Your Finances with Ease.
//           </Typography>
//           <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 2 }}>
//             Track income, expenses, and budgets with ease for smarter financial decisions.
//           </Typography>
//         </Box>

//         {/* Financial Summary Cards */}
//         <Grid container spacing={4}>
//           <Grid item xs={12} sm={4}>
//             <Card sx={{ backgroundColor: "#E8F5E9", borderRadius: 3 }}>
//               <CardContent>
//                 <Box display="flex" alignItems="center">
//                   <ArrowDownward sx={{ color: "#388E3C", mr: 1 }} />
//                   <Typography variant="h6" fontWeight={600}>
//                     Income
//                   </Typography>
//                 </Box>
//                 <Typography sx={{ mt: 1, fontSize: 20, fontWeight: 'bold' }}>
//                   $4,500.00
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <Card sx={{ backgroundColor: "#FFEBEE", borderRadius: 3 }}>
//               <CardContent>
//                 <Box display="flex" alignItems="center">
//                   <ArrowUpward sx={{ color: "#D32F2F", mr: 1 }} />
//                   <Typography variant="h6" fontWeight={600}>
//                     Expenses
//                   </Typography>
//                 </Box>
//                 <Typography sx={{ mt: 1, fontSize: 20, fontWeight: 'bold' }}>
//                   $2,100.00
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <Card sx={{ backgroundColor: "#E3F2FD", borderRadius: 3 }}>
//               <CardContent>
//                 <Box display="flex" alignItems="center">
//                   <SwapHoriz sx={{ color: "#1976D2", mr: 1 }} />
//                   <Typography variant="h6" fontWeight={600}>
//                     Transfers
//                   </Typography>
//                 </Box>
//                 <Typography sx={{ mt: 1, fontSize: 20, fontWeight: 'bold' }}>
//                   $500.00
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* User Box */}
//         <Box sx={{ mt: 6, textAlign: "center" }}>
//           <Typography variant="h5" fontWeight={500}>
//             Welcome, {user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || user?.nameid}
//           </Typography>
//           <Button
//             variant="contained"
//             color="secondary"
//             startIcon={<Logout />}
//             onClick={handleLogout}
//             sx={{ mt: 2 }}
//           >
//             Logout
//           </Button>
//         </Box>

//       </Container>
//     </Box>


  // <Box sx={{ mt: 5, backgroundColor: "#F5FAFE", py: { xs: 6, md: 10 } }}>
  //     <Container maxWidth="lg">

  //       {/* Header */}
  //       <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 }, px: 2 }}>
  //         <Typography
  //           sx={{
  //             color: "#000339",
  //             fontSize: { xs: "26px", md: "36px" },
  //             fontWeight: 700,
  //             mb: 1,
  //           }}
  //         >
  //           Take Control of Your Finances with Ease
  //         </Typography>
  //         <Typography sx={{ color: "#5A6473", fontSize: { xs: "14px", md: "16px" } }}>
  //           Track income, expenses, and budgets effortlessly for smarter financial decisions.
  //         </Typography>
  //       </Box>

  //       {/* Summary Cards */}
  //       <Grid container spacing={3}>
  //         <Grid item xs={12} sm={4}>
  //           <Card
  //             sx={{
  //               background: "linear-gradient(135deg, #A1FFCE 0%, #FAFFD1 100%)",
  //               borderRadius: 4,
  //               boxShadow: 3,
  //             }}
  //           >
  //             <CardContent>
  //               <Box display="flex" alignItems="center" mb={1}>
  //                 <ArrowDownward sx={{ color: "#2E7D32", mr: 1 }} />
  //                 <Typography fontWeight={600} fontSize="18px">
  //                   Income
  //                 </Typography>
  //               </Box>
  //               <Typography fontSize="22px" fontWeight="bold" color="#1B5E20">
  //                 $4,500.00
  //               </Typography>
  //             </CardContent>
  //           </Card>
  //         </Grid>

  //         <Grid item xs={12} sm={4}>
  //           <Card
  //             sx={{
  //               background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)",
  //               borderRadius: 4,
  //               boxShadow: 3,
  //             }}
  //           >
  //             <CardContent>
  //               <Box display="flex" alignItems="center" mb={1}>
  //                 <ArrowUpward sx={{ color: "#C62828", mr: 1 }} />
  //                 <Typography fontWeight={600} fontSize="18px">
  //                   Expenses
  //                 </Typography>
  //               </Box>
  //               <Typography fontSize="22px" fontWeight="bold" color="#B71C1C">
  //                 $2,100.00
  //               </Typography>
  //             </CardContent>
  //           </Card>
  //         </Grid>

  //         <Grid item xs={12} sm={4}>
  //           <Card
  //             sx={{
  //               background: "linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)",
  //               borderRadius: 4,
  //               boxShadow: 3,
  //             }}
  //           >
  //             <CardContent>
  //               <Box display="flex" alignItems="center" mb={1}>
  //                 <SwapHoriz sx={{ color: "#1565C0", mr: 1 }} />
  //                 <Typography fontWeight={600} fontSize="18px">
  //                   Transfers
  //                 </Typography>
  //               </Box>
  //               <Typography fontSize="22px" fontWeight="bold" color="#0D47A1">
  //                 $500.00
  //               </Typography>
  //             </CardContent>
  //           </Card>
  //         </Grid>
  //       </Grid>

  //       {/* User Info and Logout */}
  //       <Box
  //         sx={{
  //           mt: { xs: 5, md: 8 },
  //           textAlign: "center",
  //         }}
  //       >
  //         <Typography fontSize={{ xs: "20px", md: "24px" }} fontWeight={600}>
  //           Welcome, {user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || user?.nameid}
  //         </Typography>
  //         <Button
  //           variant="contained"
  //           color="secondary"
  //           startIcon={<Logout />}
  //           onClick={handleLogout}
  //           sx={{ mt: 2, px: 4, py: 1.5 }}
  //         >
  //           Logout
  //         </Button>
  //       </Box>
  //     </Container>
  //   </Box>

   <Grid container spacing={3}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card elevation={1}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Avatar variant="rounded" color={card.color} sx={{ bgcolor: `${card.color}.light`, color: `${card.color}.main` }}>
                  {card.icon}
                </Avatar>
                <Typography variant="h4">{card.count}</Typography>
              </div>
              <div>
                <Typography variant="body1">{card.title}</Typography>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Typography variant="body1" fontWeight="medium">
                    {card.percentage}
                  </Typography>
                  <Typography variant="body2">{card.status}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

  );
};

export default Dashboard;



