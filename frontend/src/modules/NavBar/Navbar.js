import React from 'react';
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className="navbar">
        eventCraft
        <div className="navbar-link">
        <Link to="/">Home</Link>
        </div>

        <div className="navbar-link">
          <Link to="/log">log in </Link>
        </div>
        
    </nav>
  );
}


export default Navbar;
