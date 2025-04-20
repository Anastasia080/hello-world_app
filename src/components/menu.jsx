import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Menu = ({ labs }) => {
  return (
    <List>
      {labs.map((lab) => (
        <ListItem button key={lab.id} component={Link} to={`/lab${lab.id}`}>
          <ListItemText primary={lab.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default Menu;