import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFeedbacks } from './feedbackSlice';
import ReadOnlyFeedback from './ReadOnlyFeedback';

const FeedbackList = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.feedback.status);
  const feedbacks = useSelector(state => state.feedback.items);

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading feedback</p>;
  if (!feedbacks || feedbacks.length === 0) return <p>No feedbacks yet</p>;

  return <ReadOnlyFeedback />;
};

export default FeedbackList;