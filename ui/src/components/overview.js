import React, { useState } from 'react';
import { Tabs, Tab, Box, Card, CardContent, Typography } from '@mui/material';
import Topics from './topics';
import Quizzes from './quizzes';

const Overview = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Card 
      sx={{
        width: { xs: '100%', sm: '80%', md: '70%' }, // Responsive width
        margin: 'auto', 
        borderRadius: '20px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        marginTop: { xs: '20px', md: '0' },
      }}
    >
      {/* Header Section */}
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{
          backgroundColor: '#0c83c8',
          color: '#fff',
          padding: '10px',
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
          textAlign: 'center',
          borderRadius: '20px 20px 0 0',
        }}
      >
        Overview
      </Typography>

      <CardContent>
        <Box 
          sx={{
            display: 'flex', // Use flexbox for layout
            flexDirection: 'column', // Stack elements
            height: '100%', // Full height
            width: '100%', // Full width
          }}
        >
          <Box sx={{ flex: '0 0 auto', marginBottom: { xs: '20px', md: '10px' } }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="tabs"
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': { fontSize: { xs: '0.8rem', sm: '1rem' } } // Font size adjustments
              }}
            >
              <Tab label="Topics" />
              <Tab label="Quizzes" />
            </Tabs>
          </Box>

          <Box 
            sx={{
              flex: 1, // Allow this box to grow and take the remaining space
              display: 'flex', // Use flex for inner content
              overflow: 'auto', // Enable scrolling if needed
            }}
          >
            {selectedTab === 0 && <Topics />}
            {selectedTab === 1 && <Quizzes />}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Overview;
