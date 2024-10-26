import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const RewardsCard = () => {
  return (
    <Card 
      sx={{
        width: { xs: '100%', md: '30%' },
        borderRadius: '20px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        marginTop: { xs: '20px', md: '0' }, // Add top margin for mobile responsiveness
        marginRight:{lg:'50px'},
        marginLeft:{lg:'50px'}
      }}
    >
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{
          backgroundColor: '#ff9800',
          color: '#fff',
          padding: '10px',
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
          textAlign: 'center',
          borderRadius: '20px 20px 0 0',
        }}
      >
        Your Latest Achievements
      </Typography>
      <CardContent>
        <Box sx={{ padding: '10px' }}>
          <Typography variant="body1" sx={{ marginBottom: '8px', fontWeight: 'bold' }}>
            Rewards & Badges
          </Typography>
          <Typography variant="body2">
            - Awarded Top Performer Badge <br />
            - Completed 5 Quizzes with a score above 90% <br />
            - Participated in Coding Challenge <br />
            - Earned React Mastery Badge
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RewardsCard;
