import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



const Navbar = () => {
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

          <Button color="inherit"><Link to="/log">Login</Link></Button>

        </Toolbar>
      </AppBar>
    </Box>
           
    </nav>
  );
}


export default Navbar;
