import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { AuthModal } from "../auth/components/AuthModal/AuthModal";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import {
  EventCardListItems,
  MainListItemsMenu
} from "../edatingPage/Dashbord";
import { useSelector } from "react-redux";
import { useInit } from "../shared/hooks/useInit/useInit";

import { useAuthHelpers } from "../auth/hooks/useAuthHelpers/useAuthHelpers";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Navbar = () => {
  const rdxUser = useSelector((state) => state.user);
  const rdxEvents = useSelector((state) => state.events);

  useInit();

  const { logout } = useAuthHelpers();

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const onLogin = () => {
    setOpenAuthModal(true);
  };

  const onLogout = () => {
    logout();
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
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="secondary"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Link
                to="/"
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                EVENTCRAFT
              </Link>
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Button
              color="inherit"
              style={{
                color: theme.palette.secondary.main,
              }}
              onClick={onLogin}
            >
              About us
            </Button>
            {!rdxUser.loggedIn && (
              <Button
                color="inherit"
                style={{
                  color: theme.palette.secondary.main,
                }}
                onClick={onLogin}
              >
                Login
              </Button>
            )}

            {rdxUser.loggedIn && (
              <Button
                color="inherit"
                style={{
                  color: theme.palette.secondary.main,
                }}
                onClick={onLogout}
              >
                logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItemsMenu />

            {rdxEvents.isEditingEventCard && (
              <>
                <Divider sx={{ my: 1 }} />
                <EventCardListItems />
              </>
            )}

        
          </List>
        </Drawer>

        <AuthModal isOpen={openAuthModal} onClose={onCloseLogin} />
      </Box>
    </nav>
  );
};

export default Navbar;
