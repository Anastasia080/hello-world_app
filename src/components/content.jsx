import { Typography, Box } from '@mui/material';

const Content = ({ title, content }) => {
  return (
    <Box sx={{ 
      p: 3,
      backgroundColor: 'var(--content-bg)',
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'var(--text-primary)' }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ 
        color: 'var(--text-primary)',
        lineHeight: 1.6
      }}>
        {content}
      </Typography>
    </Box>
  );
};

export default Content;