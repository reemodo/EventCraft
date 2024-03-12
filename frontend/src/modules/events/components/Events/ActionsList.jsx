import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const options = [
  'View',
  'Edit Event',
  'Edit Card',
  'Delete'
];
export function ActionsList({handelSelectedEvent}){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState('None'); 

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handelEventClick = (value) => {
    setSelectedOption(value); 
    handelSelectedEvent();
    handleClose();
    if (value === "View") {
      navigate(`/eventPage`);
    } 
    else if (value === "Edit Event") {
      navigate(`/editEvent`);
    }
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        ...
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === selectedOption}
            onClick={() => handelEventClick(option)} // Pass the selected option to the handler
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}