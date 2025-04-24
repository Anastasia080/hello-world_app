import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Добавлен useSelector
import { deleteFeedback, fetchFeedbacks } from './feedbackSlice';

const FeedbackList = () => {
  const dispatch = useDispatch(); // Добавлено объявление dispatch
  const feedbacks = useSelector(state => state.feedback.items);
  const status = useSelector(state => state.feedback.status);
  const error = useSelector(state => state.feedback.error);

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      dispatch(deleteFeedback(id));
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className="feedback-list">
      <h3>Feedback List</h3>
      {feedbacks.length === 0 ? (
        <p>No feedbacks yet</p>
      ) : (
        <ul>
          {feedbacks.map(feedback => (
            <li key={feedback.id}>
              <div>
                <strong>Rating: {feedback.rating}/5</strong>
                <p>{feedback.message}</p>
                <small>{new Date(feedback.createdAt).toLocaleString()}</small>
              </div>
              <button onClick={() => handleDelete(feedback.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackList;