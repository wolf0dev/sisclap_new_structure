import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({ 
  items, 
  canAccessItem,
  variant = 'vertical',
  ...props 
}) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});

  const handleExpandItem = (itemText) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemText]: !prev[itemText]
    }));
  };

  const isItemActive = (path) => {
    return location.pathname === path;
  };

  const renderMenuItem = (item) => {
    if (!canAccessItem(item.roles)) return null;

    if (item.subItems) {
      return (
        <React.Fragment key={item.text}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleExpandItem(item.text)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {expandedItems[item.text] ? <ChevronDown size={20} /> : <ChevronLeft size={20} />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedItems[item.text]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem) => {
                if (!canAccessItem(subItem.roles)) return null;
                
                return (
                  <ListItem
                    key={subItem.text}
                    disablePadding
                    sx={{ pl: 4 }}
                    component={Link}
                    to={subItem.path}
                  >
                    <ListItemButton selected={isItemActive(subItem.path)}>
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    return (
      <ListItem 
        key={item.text}
        disablePadding 
        component={Link} 
        to={item.path}
      >
        <ListItemButton selected={isItemActive(item.path)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box {...props}>
      <List>
        {items.map(renderMenuItem)}
      </List>
    </Box>
  );
};

export default Menu;