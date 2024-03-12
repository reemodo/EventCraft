import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Link } from "react-router-dom";
export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <Link
        to="/"
        style={{
          display: "inline-flex",
          color: "black",
          textDecoration: "none",
        }}
      >
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <Link
        to="/workSpace"
        style={{
          display: "inline-flex",
          color: "black",
          textDecoration: "none",
        }}
      >
        <ListItemIcon>
          <EventNoteIcon />
        </ListItemIcon>
        <ListItemText primary="WorkSpace" />
      </Link>
    </ListItemButton>

    <ListItemButton>
      <Link
        to="/addEvent"
        style={{
          display: "inline-flex",
          color: "black",
          textDecoration: "none",
        }}
      >
        <ListItemIcon>
          <InsertInvitationIcon />
        </ListItemIcon>
        <ListItemText primary="Add Event" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    
  </React.Fragment>
);
