import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { ActionsList } from "./ActionsList"
import { rdxEventsActions } from "../../rdx/events.rdx";
import { useDispatch } from "react-redux";

export const EventCard = ({ event, inHomePage, editModel }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const handelSelectedEvent=()=>{
    dispatch(rdxEventsActions.setSelectedEvent(event));
  }

  return (
    <>
      <Card sx={{ width: 350 }} >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://img.freepik.com/free-vector/hand-drawn-wedding-invitation_23-2149091987.jpg?size=626&ext=jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {event.title.charAt(0).toUpperCase() + event.title.substring(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.date}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="cardActions">
          <Button disableSpacing size="small" color="secondary">
            {inHomePage ? "join" : <ActionsList handelSelectedEvent={handelSelectedEvent}/>}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
