import GlassCard from '../../components/GlassCard/GlassCard';
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

import React from 'react';

import {
  RiBankLine,
  RiWallet3Line,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri';

export default function Dashboard2() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0f0f0f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        flexWrap: 'wrap', // allow responsive stacking on smaller screens
        p: 4,
      }}
    >
      <GlassCard
        icon={<RiBankLine size={28} />}
        count={42}
        title="Income"
        percentage={12.5}
        status="Total income"
        color="primary"
      />

      <GlassCard
        icon={<RiMoneyDollarCircleLine size={28} />}
        count={8}
        title="Expenses"
        percentage={-5.2}
        status="Total expenses"
        color="warning"
      />

      <GlassCard
        icon={<RiWallet3Line size={28} />}
        count={27}
        title="Accounts"
        percentage={6.3}
        status="Total accounts"
        color="success"
      />
    </Box>
  );
}


