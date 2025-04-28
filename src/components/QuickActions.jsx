import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addFeedback } from './feedbackSlice';
import FeedbackForm from './FeedbackForm';

const QuickActions = () => {
  const [open, setOpen] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const dispatch = useDispatch();

  const actions = [
    {
      icon: <FeedbackIcon />,
      name: 'Оставить отзыв',
      action: () => setShowFeedbackForm(true)
    }
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <SpeedDial
        ariaLabel="Quick actions"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>

      {showFeedbackForm && (
        <FeedbackForm 
          onClose={() => setShowFeedbackForm(false)} 
          onSubmit={(data) => {
            dispatch(addFeedback(data));
            setShowFeedbackForm(false);
          }}
        />
      )}
    </>
  );
};

export default QuickActions;