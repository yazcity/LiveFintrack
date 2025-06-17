import React from 'react';
import { Box, Container, Typography, styled } from '@mui/material';

 import CustomButton from '../../components/CustomButton/CustomButton';

// Shared title styling
const Title = styled(Typography)(({ theme }) => ({
  fontSize: "64px",
  color: "#fff",
  fontWeight: "bold",
  margin: theme.spacing(4, 0),
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  },
}));

const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(5),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

const WelcomeLayout = ({ children }) => (
  <Box sx={{ backgroundColor: "#FED801", minHeight: "80vh" }}>
    <Container>
      <CustomBox>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: "18px",
              color: "#687690",
              fontWeight: "500",
              mt: 10,
              mb: 4,
            }}
          >
            Welcome to a smarter way to control your finances.
          </Typography>
          <Title variant="h1">
            FinTrack – Your money, your choices, your future.
          </Title>
          <Typography variant="body2" sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}>
            Track your finances with greater precision, plan with purpose, and eliminate the stress of money management — all through a beautifully crafted and effortlessly intuitive experience.
          </Typography>
          <CustomButton
            backgroundColor="#0F1B4C"
            color="#fff"
            buttonText="More About Us"
            welcomeBtn={true}
          />
        </Box>

        <Box sx={{
          flex: 1.25,
          mt: 6,
          ml: { xs: 0, md: 6 },
        }}>
          {children}
        </Box>
      </CustomBox>
    </Container>
  </Box>
);

export default WelcomeLayout;