import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutPage = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          This platform is designed to help students complete their laboratory works efficiently.
        </Typography>
        <Typography variant="body1">
          Our mission is to make learning more interactive and engaging.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;