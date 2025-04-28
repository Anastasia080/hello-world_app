import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Labs Platform
        </Typography>
        <Typography variant="body1">
          This is the home page of our application. Navigate through the menu to access different labs.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;