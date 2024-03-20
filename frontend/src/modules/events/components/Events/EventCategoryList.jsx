import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { EventCard } from "./EventCard";
import { useSelector } from "react-redux";

export const EventCategoryList = ({
  title,
  events,
  onJoinEvent,
  onCancelJoinEvent,
}) => {
  const rdxUser = useSelector((state) => state.user);

  return (
    <>
      <Typography variant="h4" gutterBottom color="" margin= "20px" mb="30px" textAlign='center'>
        {title.charAt(0).toUpperCase() + title.substring(1)}
      </Typography>
    <div className="categoryContainer">

      <Stack
        direction={"row"}
        sx={{ overflow: "scroll" }}
       
        container
        spacing={3} 
        mb={0}
        p='15px;'
      >
        {events?.map((event) => {
          return (
            <Grid item key={event._id} xs={12} sm={6} md={5} spacing={3}  >
              <EventCard
                event={event}
                inHomePage
                userJoined={
                  !!event.attendance?.find(
                    (user) => user._id === rdxUser.currentUser.id
                  )
                }
                onJoinEvent={onJoinEvent}
                onCancelJoinEvent={onCancelJoinEvent}
              />
            </Grid>
          );
        })}
      </Stack>
      </div>
    </>
  );
};
