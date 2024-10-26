import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Hometabs from '../components/overview';
import Header from '../components/header';
import RewardsCard from '../components/RewardsCard';
import CertificatesCard from '../components/CertificatesCard';
import Overview from '../components/overview';

const Home = () => {
  return (
    <div> 
      <Header />
      <Box 
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Column on small screens, row on larger screens
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' }, // Center items on small screens
          height: '100%',
          padding: { xs: '10px', md: '20px' },
        }}
      >
        <Overview/>
        <RewardsCard />
        <CertificatesCard />
      </Box>
    </div>
  );
};

export default Home;
