import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './authSlice';

import { 
  IconButton
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const ProfileButton = ({ theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logout()); // Используйте action logout
    navigate('/', { replace: true });
  };

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <IconButton
          color="inherit"
          onClick={() => navigate('/profile')}
          sx={{ mr: 2 }}
        >
          <AccountCircle />
        </IconButton>

      <IconButton
          color="inherit"
          onClick={handleLogout}
          sx={{ mr: 2 }}
        >
          <ExitToAppIcon />
        </IconButton>
    </div>
  );
};

export default ProfileButton;