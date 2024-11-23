import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import ProblemIcon from "@mui/icons-material/ReportProblem";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Logo from "../images/Zealous.png";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const drawerItems = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Courses", icon: <SchoolIcon /> },
    { text: "Students", icon: <GroupIcon /> },
    { text: "Problems", icon: <ProblemIcon /> },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('true');
    window.location.assign('/');
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 10,
      marginTop: theme.spacing(1),
      minWidth: 50,
      color: "rgb(55, 65, 81)",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[300],
      }),
    },
  }));

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const isMenuOpen = Boolean(menuAnchor);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          px: { xs: 1, sm: 3 },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Drawer Menu for Small Screens */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              style={{ color: "#0c83c8" }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo Image - Centered */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ height: "70px", cursor: "pointer" }}
            />
          </Box>

          {/* Right Side Icons and Menu Items */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Always show the right side items on both small and large screens */}
            <Box
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              <div>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    marginRight: "0px",
                    marginLeft: "50px",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    cursor: "pointer",
                  }}
                >
                  Modules
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    My Course
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <FileCopyIcon />
                    All Course 
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleClose} disableRipple>
                    <ArchiveIcon />
                    Upcoming Course
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <MoreHorizIcon />
                    More
                  </MenuItem>
                </StyledMenu>
              </div>
            </Box>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenuOpen}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={isMenuOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 ,backgroundColor:'#fc7a46'}}>M</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={menuAnchor}
              id="account-menu"
              open={isMenuOpen}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Small Screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)}
        >
          <List>
            {drawerItems.map((item) => (
              <ListItemButton key={item.text}>
                <ListItemIcon sx={{ color: "#0c83c8" }}>
                  {item.icon}
                </ListItemIcon>
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
