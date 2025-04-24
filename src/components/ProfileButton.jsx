import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from './button';
import { logout } from './authSlice';

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
      <Button label="Profile" onClick={() => navigate('/profile')} theme={theme} />
      <Button label="Logout" onClick={handleLogout} theme={theme} />
    </div>
  );
};

export default ProfileButton;