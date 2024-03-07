import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";


import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";

import { AuthModal } from "../auth/components/AuthModal/AuthModal";

const Navbar = () => {

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const onLogin = () => {
    setOpenAuthModal(true);
  };
  const onCloseLogin = () => {
    setOpenAuthModal(false);
  };

  const theme = useTheme();


  return (
    <nav className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              EVENTCRAFT
            </Typography>

            <Typography variant="h6" component="div" sx={{ flexGrow: 40 }}>
              <Link
                to="/"
                style={{
                  color: theme.palette.secondary.main,
                  textDecoration: "none",
                }}
              >
                Home
              </Link>
            </Typography>

            <Button
              color="inherit"
              style={{
                color: theme.palette.secondary.main,
              }}
              onClick={onLogin}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>

        <AuthModal isOpen={openAuthModal} onClose={onCloseLogin} />
      </Box>

    </nav>
  );
};

export default Navbar;
