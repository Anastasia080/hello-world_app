import { useDispatch } from 'react-redux';
import { logout } from '../components/authSlice';
import { Button, Menu, MenuItem, Avatar, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    window.location.href = 'http://localhost:5173/auth'; // Полный переход с обновлением страницы
  };

  return (
    <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
      <Button
        onClick={handleClick}
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Avatar sx={{ width: 32, height: 32 }} />
        <Typography variant="body1">Profile</Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Exit</MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileButton;