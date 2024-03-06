import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { AuthModal } from "../auth/components/AuthModal/AuthModal";

const Navbar = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const onLogin = () => {
    setOpenAuthModal(true);
  };
  const onCloseLogin = () => {
    setOpenAuthModal(false);
  };

  return (
    <nav className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              eventCraft
            </Typography>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Home</Link>
            </Typography>

            <Button color="inherit" onClick={onLogin}>
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
