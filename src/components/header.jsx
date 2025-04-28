import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  IconButton,
  useTheme,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleDrawer } from './drawerSlice';
import ProfileButton from './ProfileButton';

const Header = ({ toggleTheme }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Кнопка меню для мобильных устройств */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => dispatch(toggleDrawer())}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Навигационные кнопки */}
        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
        
        {/* Кнопка Labs для десктопов */}
        <Button 
          color="inherit" 
          onClick={() => dispatch(toggleDrawer())}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          Labs
        </Button>

        {/* Кнопка смены темы */}
        <IconButton color="inherit" onClick={toggleTheme}>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <ProfileButton />
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;