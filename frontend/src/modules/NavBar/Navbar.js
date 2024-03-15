import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { AuthModal } from "../auth/components/AuthModal/AuthModal";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import { mainListItems, secondaryListItems } from '../edatingPage/Dashbord';
import "./navbar.css"
import logoImage from './logo.jpg';


const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: '#00784A', // Adding the desired color
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const Navbar = () => {

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const onLogin = () => {
    setOpenAuthModal(true);
  };
  const onCloseLogin = () => {
    setOpenAuthModal(false);
  };

  const theme = useTheme();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <nav className="navbar">
      <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      
      <AppBar position="absolute" open={open}>
      <Toolbar>
          <IconButton
              edge="start"
              color="secondary"
              aria-label="open drawer"
              onClick={toggleDrawer}
              className="menuIconButton"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className="logoTypography"
            >
              <Link
                to="/"
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <div className="logoContainer">
                    <div className="logoImage"></div>
                    <span>EVENTCRAFT</span>
                  </div>

                
              </Link>

            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
      
            <Button
              color="inherit"
              className="aboutButton"
              onClick={onLogin}
            >
              About us
            </Button>
            <Button
              color="inherit"
              className="loginButton"
              onClick={onLogin}
            >
              Login
            </Button>
          </Toolbar>
          </AppBar> 
          <Drawer variant="permanent" open={open}>
          <Toolbar>
            <IconButton onClick={toggleDrawer} className="chevronIconButton">
              <ChevronLeftIcon />
            </IconButton>
            </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider className="divider" />
            {secondaryListItems}
          </List>
        </Drawer>
        <AuthModal isOpen={openAuthModal} onClose={onCloseLogin} />
      </Box>
    </nav>
  );
};

export default Navbar;
