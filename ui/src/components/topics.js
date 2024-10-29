import React from 'react';
import { Box, Typography, LinearProgress, Card, CardContent } from '@mui/material';

const courses = [
  { name: 'HTML', progress: 70 },
  { name: 'CSS', progress: 50 },
  { name: 'Python', progress: 30 },
  { name: 'React', progress: 90 },
  { name: 'JavaScript', progress: 80 },
  { name: 'TypeScript', progress: 60 },
];

const Topics = () => {
  return (
    <Box sx={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#0c83c8' }}>
        TOPICS LIST
      </Typography>
      <Box 
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, // Responsive grid
          gap: 2, // Space between cards
          flexGrow: 1, // Allow to fill the remaining space
        }}
      >
        {courses.map((course) => (
          <Card key={course.name} sx={{ borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{course.name}</Typography>
              <LinearProgress 
                variant="determinate" 
                value={course.progress} 
                sx={{ height: 10, borderRadius: 5, marginTop: 1, backgroundColor: '#e0e0e0', '& .MuiLinearProgress-bar': { backgroundColor: '#0c83c8' }}}
              />
              <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                {course.progress}% completed
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Topics;
