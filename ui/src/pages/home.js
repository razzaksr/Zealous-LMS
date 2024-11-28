import React from 'react';
<<<<<<< HEAD
import { Box, Typography, Card, CardContent } from '@mui/material';
import Hometabs from '../components/overview';
import Header from '../components/header';
import RewardsCard from '../components/RewardsCard';
import CertificatesCard from '../components/CertificatesCard';
import Overview from '../components/overview';
import '../styles/bg.css'
=======
import { Box } from '@mui/material';
// import Hometabs from '../components/overview';
import Header from '../components/header';
// import RewardsCard from '../components/RewardsCard';
// import CertificatesCard from '../components/CertificatesCard';
import Overview from '../components/overview';
>>>>>>> ae23ec7f2d08608c6b6861fab13a9871a71eca7f

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
<<<<<<< HEAD
        <RewardsCard />
        <CertificatesCard />
=======
        {/* <RewardsCard />
        <CertificatesCard /> */}
>>>>>>> ae23ec7f2d08608c6b6861fab13a9871a71eca7f
      </Box>
    </div>
  );
};

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> ae23ec7f2d08608c6b6861fab13a9871a71eca7f
