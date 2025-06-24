import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Card,
  useTheme
} from '@mui/material';
import { RiBankLine } from 'react-icons/ri';

const GlassCard = ({
  icon = <RiBankLine size={28} />,
  count = 42,
  title = 'Income',
  percentage = 18.2,
  status = 'Total income',
  color = 'primary',
}) => {
  const theme = useTheme();
  const positive = percentage >= 0;

  return (
    <Card
      elevation={0}
      sx={{
        width: 280,
        height: 180,
        borderRadius: 4,
        p: 3,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#fff',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: '0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
        },
      }}
    >
      <Avatar
        variant="rounded"
        sx={{
          bgcolor: theme.palette[color].main,
          width: 50,
          height: 50,
          mb: 1.5,
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
      >
        {icon}
      </Avatar>

      <Typography variant="h4" fontWeight="bold">
        {count}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ textTransform: 'uppercase', fontWeight: 600, opacity: 0.9 }}
      >
        {title}
      </Typography>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          {status}
        </Typography>

        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ color: positive ? '#4caf50' : '#f44336' }}
        >
          {positive ? '▲' : '▼'} {Math.abs(percentage)}%
        </Typography>
      </Stack>
    </Card>
  );
};

export default GlassCard;
