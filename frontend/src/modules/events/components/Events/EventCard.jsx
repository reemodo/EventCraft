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

import { ActionsList } from "./ActionsList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEventHelpers } from "../../hooks/useEventHelper";
import { LoadingButton } from "@mui/lab";

export const EventCard = ({
  event,
  inHomePage,
  handelSetEventLists,
  userJoined,
  onJoinEvent,
  onCancelJoinEvent,
}) => {
  const navigate = useNavigate();

  const {
    joinEvent,
    pendingJoinEvent,
    cancelJoinedEvent,
    pendingCancelJoinedEvent,
  } = useEventHelpers();

  const rdxUser = useSelector((state) => state.user);

  const handelEventClick = (e) => {
    if (inHomePage) {
      navigate(`/eventPage/${event._id}`);
    }
  };

  const onUserJoinEvent = async (e) => {
    e.stopPropagation();
    const eventJoined = await joinEvent(rdxUser.currentUser.id, event._id);

    if (eventJoined?._id) {
      onJoinEvent(event, rdxUser.currentUser.id);
    }
  };

  const onCancelUserJoinEvent = async (e) => {
    e.stopPropagation();
    const eventJoined = await cancelJoinedEvent(
      rdxUser.currentUser.id,
      event._id
    );

    if (eventJoined?._id) {
      // onCancelJoinEvent(event, rdxUser.currentUser.id);
    }
  };

  return (
    <>
      <Card sx={{ width: 350 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            sx={{ objectFit: "fill" }}
            objectFit={"cover"}
            image={event.cardID?.img}
            alt="green iguana"
            onClick={handelEventClick}
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
          {rdxUser.loggedIn && (
            <>
              {inHomePage && !userJoined && (
                <LoadingButton
                  loading={pendingJoinEvent}
                  disableSpacing
                  size="small"
                  color="secondary"
                  onClick={onUserJoinEvent}
                >
                  join
                </LoadingButton>
              )}

              {inHomePage && userJoined && (
                <LoadingButton
                  loading={pendingCancelJoinedEvent}
                  disableSpacing
                  size="small"
                  color="secondary"
                  onClick={onCancelUserJoinEvent}
                >
                  cancel
                </LoadingButton>
              )}

              {!inHomePage && (
                <Button disableSpacing size="small" color="secondary">
                  <ActionsList
                    event={event}
                    handelSetEventLists={handelSetEventLists}
                  />
                </Button>
              )}
            </>
          )}
        </CardActions>
      </Card>
    </>
  );
};
