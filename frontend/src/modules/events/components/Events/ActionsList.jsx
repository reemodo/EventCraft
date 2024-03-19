import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useEventCardHelpers } from "../../card/hooks/useEventCardHelpers";
import { useDeleteEventMutation } from "../../api/events.api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export function ActionsList({ event, handelSetEventLists }) {
  const options = ["View", "Attendees", "Edit Event", "Edit Card", "Delete"];
  const EventActions = {
    Attendees: "/event/attendees/" + event._id,
    EditEvent: "/editEvent/" + event._id,
    EditCard: "/editCard/" + event.cardID?._id,
    Delete: "",
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState("None");
  const { getEventCard } = useEventCardHelpers();

  const [deleteEvent] = useDeleteEventMutation();
  const [snackbarOpen, setSnackbarOpen] = React.useState(true);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handelEventClick = async (value) => {
    if (value === "Delete") {
      try {
        await deleteEvent({ id: event._id });
        setSnackbarOpen(true);
        setSnackbarMessage("Event deleted");
        handelSetEventLists(event._id);
        handleClose();
      } catch (error) {
        console.error("Error deleting event:", error);
        setSnackbarOpen(true);
        setSnackbarMessage("Error deleting event. Please try again.");
      }
    } else if (EventActions[value]) {
      navigate(EventActions[value]);
    }
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={anchorEl ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        onClick={handleClick}
        sx={{ color: "#222", fontSize: "x-large" }}
      >
        ...
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === selectedOption}
            onClick={() => handelEventClick(option.replace(" ", ""))}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
