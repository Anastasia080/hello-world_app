import React from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const Content = ({ labs }) => {
  const { id } = useParams();
  const lab = labs.find((lab) => lab.id === id);

  if (!lab) {
    return <Typography variant="h5">Lab not found</Typography>;
  }

  return (
    <div>
      <Typography variant="h5">{lab.title}</Typography>
      <Typography>{lab.content}</Typography>
    </div>
  );
};

export default Content;