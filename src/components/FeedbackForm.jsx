// components/Feedback.jsx
import { useState,useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Feedback = () => {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('feedback-reviews');
    return saved ? JSON.parse(saved) : [];
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    localStorage.setItem('feedback-reviews', JSON.stringify(reviews));
  }, [reviews]);
  const onSubmit = useCallback((data) => {
    setReviews(prev => [...prev, {
      id: Date.now(),
      name: data.name,
      text: data.feedback,
      date: new Date().toLocaleString()
    }]);
    reset();
  }, [reset]);

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(review => review.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, backgroundColor: 'var(--feedback-bg)',
      borderRadius: 2,
      boxShadow: 1 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'var(--text-primary)' }}>Feedback</Typography>
      
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          {...register('name', { required: 'The name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{
            '& label': { color: 'var(--text-secondary)' },
            '& fieldset': { borderColor: 'var(--border-color)' }
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Your feedback"
          multiline
          rows={4}
          {...register('feedback', { required: 'A review is required' })}
          error={!!errors.feedback}
          helperText={errors.feedback?.message}
          sx={{
            '& label': { color: 'var(--text-secondary)' },
            '& fieldset': { borderColor: 'var(--border-color)' }
          }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2,
            backgroundColor: '#191970',
            '&:hover': {
              backgroundColor: '#191970', 
            }
           }}>
          Send
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ color: 'var(--text-primary)' }}>Reviews:</Typography>
      {reviews.length === 0 ? (
        <Typography sx={{ color: 'var(--text-secondary)' }}>There are no reviews yet</Typography>
      ) : (
        <List>
          {reviews.map(review => (
            <ListItem 
              key={review.id} 
              sx={{ 
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <ListItemText 
                primary={review.name}
                secondary={`${review.text} (${review.date})`}
                sx={{ color: 'var(--text-primary)' }}
              />
              <Button 
                onClick={() => deleteReview(review.id)}
                sx={{ color: 'var(--error)' }}
              >
                Удалить
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Feedback;