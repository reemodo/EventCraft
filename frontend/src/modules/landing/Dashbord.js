import * as React from "react";
import { Link } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TitleIcon from "@mui/icons-material/Title";
import ImageIcon from "@mui/icons-material/Image";
import InterestsIcon from "@mui/icons-material/Interests";

import { useDispatch } from "react-redux";
import { ItemTypes } from "../events/card/components/CardEdit/CardEdit";
import { rdxEventsActions } from "../events/rdx/events.rdx";

const mainListItems = [
  { title: "Home", icon: CalendarMonthIcon, url: "/" },
  { title: "WorkSpace", icon: EventNoteIcon, url: "/workSpace" },

];

export const MainListItemsMenu = () => {
  return (
    <React.Fragment>
      {mainListItems.map((link, idx) => (
        <ListItemButton key={idx}>
          <Link
            to={link.url}
            style={{
              display: "inline-flex",
              color: "black",
              textDecoration: "none",
            }}
          >
            <ListItemIcon>
              <link.icon />
            </ListItemIcon>
            <ListItemText primary={link.title} />
          </Link>
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};


const editCardEventListItems = [
  { type: ItemTypes.TEXT, icon: TitleIcon },
  { type: ItemTypes.IMAGE, icon: ImageIcon },
  { type: ItemTypes.SHAPE, icon: InterestsIcon },
];

export const EventCardListItems = () => {
  const dispatch = useDispatch();

  const onSelectCardItemList = (type) => {
    dispatch(rdxEventsActions.setEditedCardItemType(type));
  };

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Edit Event Card
      </ListSubheader>

      {editCardEventListItems.map((link, idx) => (
        <ListItemButton
          key={idx}
          onClick={() => onSelectCardItemList(link.type)}
        >
          <ListItemIcon>
            <link.icon />
          </ListItemIcon>
          <ListItemText primary={link.type} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};
