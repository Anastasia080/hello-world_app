import React from 'react';
import { Typography } from '@mui/material';

const Content = ({ lab }) => {
    return (
        <div>
            <Typography variant="h5">{lab.title}</Typography>
            <Typography>{lab.content}</Typography>
        </div>
    );
};

export default Content;