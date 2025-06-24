import React from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Card,
  CardContent,
  Stack,
  Divider,
  LinearProgress,
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
    icon: <RiBankLine size={24} />,
    count: 42,
    title: 'Income',
    percentage: 18.2,
    status: 'Total income',
    color: 'primary',
  },
  {
    icon: <RiMoneyDollarCircleLine size={24} />,
    count: 8,
    title: 'Expenses',
    percentage: -8.7,
    status: 'Total expenses',
    color: 'warning',
  },
  {
    icon: <RiWallet3Line size={24} />,
    count: 27,
    title: 'Accounts',
    percentage: 4.3,
    status: 'Total account balance',
    color: 'error',
  },
  {
    icon: <RiExchangeDollarLine size={24} />,
    count: 13,
    title: 'Transactions',
    percentage: 2.5,
    status: 'Transactions this month',
    color: 'info',
  },
  {
    icon: <RiPieChart2Line size={24} />,
    count: 21,
    title: 'Budgets',
    percentage: 6.1,
    status: 'This month’s budget',
    color: 'success',
  },
];

const Dashboard1 = () => {
  return (
    <Box sx={{ mt: 5, backgroundColor: '#F5FAFE', py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="#000339"
            gutterBottom
          >
            Take Control of Your Finances with Ease.
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track income, expenses, and budgets with ease for smarter financial decisions.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {cardData.map((card, index) => {
            const positive = card.percentage >= 0;
            return (
              <Card
                key={index}
                elevation={8}
                sx={{
                  flex: '1 1 calc(20% - 32px)', // 5 cards max per row
                  minWidth: 220,
                  maxWidth: 260,
                  borderRadius: 4,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow:
                    '0 4px 15px rgba(0, 0, 0, 0.08)',

                  '&:hover': {
                    boxShadow:
                      '0 8px 30px rgba(0, 0, 0, 0.15)',
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        bgcolor: (theme) => theme.palette[card.color].main,
                        width: 56,
                        height: 56,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      }}
                    >
                      {card.icon}
                    </Avatar>

                    <Typography variant="h4" fontWeight="700">
                      {card.count}
                    </Typography>
                  </Stack>

                  <Box mb={1}>
                    <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {card.status}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color={positive ? 'success.main' : 'error.main'}
                      >
                        {positive ? '+' : ''}
                        {card.percentage}%
                      </Typography>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: positive ? 'success.main' : 'error.main',
                        }}
                      />
                    </Stack>

                    {/* Optional progress bar showing percentage relative to 100 */}
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(Math.abs(card.percentage), 100)}
                      sx={{
                        mt: 1,
                        height: 8,
                        borderRadius: 5,
                        bgcolor: (theme) =>
                          theme.palette.grey[300],
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          bgcolor: (theme) =>
                            theme.palette[card.color].main,
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard1;
