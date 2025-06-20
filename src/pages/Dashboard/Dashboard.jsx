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

        <Box sx={{ mt: 5, backgroundColor: "#F5FAFE" , py: 10}}>
        <Container>
            <PropertoiesTextBox>
               <Typography sx ={{color: "#000339", fontSize: "35px", fontWeight: "bold", ml:"13px" }}>
               Take Control of Your Finances with Ease.
               </Typography>
               <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 1,ml:"13px" }}>
                 Track income, expenses, and budgets with ease for smarter financial decisions.
               </Typography>
            </PropertoiesTextBox>
            <DishesBox>
                {Data.map((foodItem) => (
                    <CustomCard
                      key={foodItem.id}
                      img={foodItem.img}
                      price={foodItem.price}
                      item={foodItem.price}
                      likes={foodItem.likes}
                      heart={foodItem.heart}
                      share={foodItem.share}/>
                ))}
            </DishesBox>
        </Container>

        
           <Box style={{ padding: 20 }}>
       <Typography variant="h4">
         Welcome, {user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || user?.nameid}
       </Typography>
       <Button
         variant="contained"
         color="secondary"
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
         Logout
      </Button>



     </Box>
    </Box>


  );
};

export default Dashboard;
