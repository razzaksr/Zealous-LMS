import React from 'react';
import { Box, Typography, Card, CardContent, Rating } from '@mui/material';

const quizzesData = [
  {
    title: 'Debugging Dilemmas',
    topic: 'Python',
    rating: 4, 
  },
  {
    title: 'HTML Hangout: Test Your Skills!',
    topic: 'HTML',
    rating: 3.5,
  },
  {
    title: 'Agile Adventures: A Project Management Quiz',
    topic: 'Agile',
    rating: 5,
  },
  {
    title: 'Java Journey: The Ultimate Quiz',
    topic: 'Java',
    rating: 4.5,
  },
];

const Quizzes = () => {
  return (
    <Box sx={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#0c83c8' }}>
        QUIZZES LIST
      </Typography>
      <Box 
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, // Responsive grid
          gap: 2, // Space between cards
          flexGrow: 1, // Allow to fill the remaining space
        }}
      >
        {quizzesData.map((quiz, index) => (
          <Card key={index} sx={{ borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{quiz.title}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Topic: {quiz.topic}
              </Typography>
              <Rating name={`quiz-rating-${index}`} value={quiz.rating} readOnly precision={0.5} sx={{ marginTop: 1 }} />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Quizzes;
