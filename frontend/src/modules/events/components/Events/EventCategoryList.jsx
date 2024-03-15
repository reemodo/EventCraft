import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { EventCard } from "./EventCard";
import { useSelector } from "react-redux";

export const EventCategoryList = ({ title, events, onJoinEvent, onCancelJoinEvent }) => {
  const rdxUser = useSelector((state) => state.user);

  return (
    <>
      <Typography variant="h4" gutterBottom color="">
        {title.charAt(0).toUpperCase() + title.substring(1)}
      </Typography>

      <Stack
        direction={"row"}
        sx={{ overflow: "scroll" }}
        mb={10}
        container
        spacing={3}
      >
        {events?.map((event) => {
          return (
            <Grid item key={event._id} xs={12} sm={6} md={5} spacing={3}>
              <EventCard
                event={event}
                inHomePage
                userJoined={event.attendance.includes(rdxUser.currentUser.id)}
                onJoinEvent={onJoinEvent}
                onCancelJoinEvent={onCancelJoinEvent}
              />
            </Grid>
          );
        })}
      </Stack>
    </>
  );
};
