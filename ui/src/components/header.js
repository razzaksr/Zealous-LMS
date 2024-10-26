import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItemButton, ListItemText, ListItemIcon, Avatar, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import ProblemIcon from '@mui/icons-material/ReportProblem';
import Logo from '../images/Zealous.png';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const drawerItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Courses', icon: <SchoolIcon /> },
    { text: 'Students', icon: <GroupIcon /> },
    { text: 'Problems', icon: <ProblemIcon /> },
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#ffffff', borderRadius: '20px', px: { xs: 1, sm: 3 } }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* Left Drawer Menu for Small Screens */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              style={{ color: '#0c83c8' }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo Image - Centered */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <img src={Logo} alt="Logo" style={{ height: '70px', cursor: 'pointer' }} />
          </Box>

          {/* Right Side Icons and Menu Items */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Always show the right side items on both small and large screens */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Typography variant="h6" component="div" sx={{ marginRight: 2, color: '#0c83c8', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                Course
              </Typography>
              <Typography variant="h6" component="div" sx={{ marginRight: 2, color: '#0c83c8', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                Students
              </Typography>
              <Typography variant="h6" component="div" sx={{ marginRight: 2, color: '#0c83c8', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                Problem
              </Typography>
            </Box>

            {/* Notification Icon */}
            <IconButton color="inherit" sx={{ marginRight: 2, color: '#0c83c8' }}>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Avatar Icon */}
            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Small Screens */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
          <List>
            {drawerItems.map((item) => (
              <ListItemButton key={item.text}>
                <ListItemIcon sx={{ color: '#0c83c8' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
