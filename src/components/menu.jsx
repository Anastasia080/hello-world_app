import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from './drawerSlice';
import { Link } from 'react-router-dom';

const Menu = ({ labs }) => {
  const theme = useTheme();
  const isDrawerOpen = useSelector(state => state.drawer.open);
  const dispatch = useDispatch();

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => dispatch(toggleDrawer())}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: '64px' // Отступ под Header
        },
      }}
    >
      <Divider />
      <List>
        {labs.map((lab) => (
          <ListItem 
            button 
            key={lab.id} 
            component={Link} 
            to={`/lab${lab.id}`}
            onClick={() => dispatch(toggleDrawer())} // Закрываем меню при выборе
          >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary={lab.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Menu;