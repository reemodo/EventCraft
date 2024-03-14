import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { useEventCardHelpers } from '../../card/hooks/useEventCardHelpers';
import { useDeleteEventMutation } from '../../api/events.api';

export function ActionsList({event, handelSetEventLists}){
  const options = [
    'View',
    'Edit Event',
    'Edit Card',
    'Delete'
  ];
  const EventActions = {
    View : '/eventPage/' +event._id,
    EditEvent : '/editEvent/' + event._id,
    EditCard : '/editCard/'+ event.cardID?._id,
    Delete : '',
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState('None'); 
  const {getEventCard} = useEventCardHelpers();

  const [deleteEvent] = useDeleteEventMutation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
//TODO:  for each option make a handel
  const handelEventClick = (value) => {
    if(value === 'Delete'){
      (async() => {
        const deletedEvent = await deleteEvent({id:event._id} )
        if(deleteEvent){
          handleClose()
          alert('deleted')
          handelSetEventLists(event._id)
        }
        else{
          alert('error')
        }
      })();
    }
    if (EventActions[value]) {
      navigate(EventActions[value] );
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
            onClick={() => handelEventClick(option.replace(" ", ""))} // Pass the selected option to the handler
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}