import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { link: '/', label: 'Home' },
    { link: '/courses', label: 'Courses' },
    { link: '/about', label: 'About' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <AppBar position='fixed' color='default'>
          <Toolbar sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleMenu}>
              <MenuIcon />
            </IconButton>
            <Button variant="contained" color="primary" component={Link} to="/signin">Connect Wallet</Button>
            <div style={{ width: 48 }} /> {/* This is an empty space equal to the hamburger menu's width for centering the button */}
          </Toolbar>
          <Drawer anchor='left' open={isMenuOpen} onClose={closeMenu}>
            <List sx={{ width: 250 }}>
              {menuItems.map((item, index) => (
                <Link key={index} to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItem button onClick={closeMenu} sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                    <ListItemText primary={item.label} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        </AppBar>
      ) : (
        <AppBar position='fixed' color='default'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item, index) => (
                <Link key={index} to={item.link} style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  marginRight: theme.spacing(2),
                  '&:hover': {
                    textDecoration: 'none',
                    color: theme.palette.primary.main
                  }
                }}>
                  {item.label}
                </Link>
              ))}
            </div>
            <Button variant="contained" color="primary" component={Link} to="/signin">Connect Wallet</Button>
          </Toolbar>
        </AppBar>
      )}

      <div style={{ height: '64px' }} />
    </>
  );
}

export default Navbar;
