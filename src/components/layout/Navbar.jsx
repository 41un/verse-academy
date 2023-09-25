import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Web3Button } from '@web3modal/react'; 

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isMenuOpen, setIsMenuOpen] = useState(false); 

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
        <AppBar position='fixed' sx={{ backgroundColor: '#040B13' }}>
          <Toolbar sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleMenu} sx={{ color: '#FFFFFF' }}>
              <MenuIcon />
            </IconButton>
            <Web3Button />
            <div style={{ width: 48 }} />
          </Toolbar>
          <Drawer anchor='left' open={isMenuOpen} onClose={closeMenu} PaperProps={{ style: { backgroundColor: '#040B13' } }}>
            <List sx={{ width: 250, backgroundColor: '#040B13', color: '#FFFFFF' }}>
              {menuItems.map((item, index) => (
                <Link key={index} to={item.link} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                  <ListItem button onClick={closeMenu} sx={{ '&:hover': { backgroundColor: '#1A2B3A' } }}>
                    <ListItemText primary={item.label} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        </AppBar>
      ) : (
        <AppBar position='fixed' sx={{ backgroundColor: '#040B13' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item, index) => (
                <Link key={index} to={item.link} style={{
                  textDecoration: 'none',
                  color: '#FFFFFF',
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
            <Web3Button />
          </Toolbar>
        </AppBar>
      )}

      <div style={{ height: '64px' }} />
    </>
  );
}

export default Navbar;
