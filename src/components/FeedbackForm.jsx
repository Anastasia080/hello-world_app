import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback } from './feedbackSlice';

const FeedbackForm = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const feedbackData = {
      userId: currentUser.id,
      message,
      rating,
      createdAt: new Date().toISOString()
    };

    dispatch(addFeedback(feedbackData));
    setMessage('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h3>Leave Feedback</h3>
      <div>
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;