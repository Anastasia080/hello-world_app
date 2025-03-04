import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#DCDCDC' }}>
            <Toolbar>
                <Typography variant="h6" color='#000'>Labs</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;