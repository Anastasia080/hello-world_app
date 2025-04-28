import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback } from './feedbackSlice';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Rating, Stack } from '@mui/material';

const FeedbackForm = ({ onClose, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const currentUser = useSelector(state => state.auth.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSubmit({
      userId: currentUser?.id || 'anonymous',
      message,
      rating,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Оставить отзыв</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              precision={1}
            />
            <TextField
              label="Сообщение"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Отправить
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;