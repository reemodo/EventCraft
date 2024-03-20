import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import { useEventCardHelpers } from "../../card/hooks/useEventCardHelpers";
import { useDeleteEventMutation } from "../../api/events.api";
import Snackbar from "@mui/material/Snackbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CustomSnackbar from "../../../shared/components/CustomSnackbar/CustomSnackbar";
import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)`
  && {
    color: #616161;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

// Styled components for each MenuItem
const StyledMenuItem = {
  Attendees: styled(MenuItem)`
    && {
      color: blue;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
  `,
  EditEvent: styled(MenuItem)`
    && {
      color: green;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
  `,
  EditCard: styled(MenuItem)`
    && {
      color: orange;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
  `,
  Delete: styled(MenuItem)`
    && {
      color: red;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
  `,
};

// Icons for each MenuItem
const MenuItemIcons = {
  Attendees: <PersonIcon />,
  EditEvent: <EditIcon />,
  EditCard: <EditIcon />, // Replace with an appropriate icon
  Delete: <DeleteIcon />,
};

export function ActionsList({ event, handelSetEventLists }) {
  const options = ["Attendees", "Edit Event", "Edit Card", "Delete"];
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
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
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
        handleClose();
        handelSetEventLists(event._id);
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
      <StyledIconButton
        id="basic-button"
        aria-controls={anchorEl ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </StyledIconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((option) => {
          const StyledItem = StyledMenuItem[option.replace(" ", "")];
          return (
            <StyledItem
              key={option}
              selected={option === selectedOption}
              onClick={() => handelEventClick(option.replace(" ", ""))}
            >
              <ListItemIcon>{MenuItemIcons[option.replace(" ", "")]}</ListItemIcon>
              {option}
            </StyledItem>
          );
        })}
      </Menu>

      <CustomSnackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        severity="error"
        color="error"
        message={snackbarMessage}
      />
    </>
  );
}
