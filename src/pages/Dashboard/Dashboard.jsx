import React from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Card,
  CardContent,
  Stack,
  useTheme,
} from '@mui/material';
import {
  RiBankLine,
  RiMoneyDollarCircleLine,
  RiWallet3Line,
  RiExchangeDollarLine,
  RiPieChart2Line,
} from 'react-icons/ri';

const cardData = [
  {
    icon: <RiBankLine size={28} />,
    count: 42,
    title: 'Income',
    percentage: 18.2,
    status: 'Total income',
    color: 'primary',
  },
  {
    icon: <RiMoneyDollarCircleLine size={28} />,
    count: 8,
    title: 'Expenses',
    percentage: -8.7,
    status: 'Total expenses',
    color: 'warning',
  },
  {
    icon: <RiWallet3Line size={28} />,
    count: 27,
    title: 'Accounts',
    percentage: 4.3,
    status: 'Total account balance',
    color: 'error',
  },
  {
    icon: <RiExchangeDollarLine size={28} />,
    count: 13,
    title: 'Transactions',
    percentage: 2.5,
    status: 'Transactions this month',
    color: 'info',
  },
  {
    icon: <RiPieChart2Line size={28} />,
    count: 21,
    title: 'Budgets',
    percentage: 6.1,
    status: 'This month’s budget',
    color: 'success',
  },
];

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 3, backgroundColor: '#F5FAFE', py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="bold"
          color="#000339"
          gutterBottom
          mb={4}
        >
          Take Control of Your Finances with Ease.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 4,
            '@media (max-width: 1200px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
            '@media (max-width: 600px)': {
              gridTemplateColumns: '1fr',
            },
          }}
        >
          {cardData.map((card, index) => {
            const positive = card.percentage >= 0;

            return (
              <Card
                key={index}
                elevation={6}
                sx={{
                  borderRadius: 3,
                  color: theme.palette.common.white,
                  background: theme.palette[card.color].main,
                  position: 'relative',
                  overflow: 'hidden',
                  height: 180,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 3,
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
                  },
                }}
              >
                {/* Icon in circle */}
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: theme.palette[card.color].dark,
                    width: 56,
                    height: 56,
                    mb: 1.5,
                  }}
                >
                  {card.icon}
                </Avatar>

                {/* Big Count Number */}
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ lineHeight: 1 }}
                >
                  {card.count}
                </Typography>

                {/* Title */}
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ textTransform: 'uppercase', letterSpacing: 1.2 }}
                >
                  {card.title}
                </Typography>

                {/* Status & Percentage */}
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={1}
                >
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.8 }}
                  >
                    {card.status}
                  </Typography>

                  <Typography
                    variant="body1"
                    fontWeight={700}
                    sx={{
                      color: positive
                        ? theme.palette.success.light
                        : theme.palette.error.light,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {positive ? '▲' : '▼'} {Math.abs(card.percentage)}%
                  </Typography>
                </Stack>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
