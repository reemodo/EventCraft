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
      <Typography
        variant="h4"
        gutterBottom
        color=""
        margin="20px"
        mb="30px"
        textAlign="center"
        sx={{
          fontSize: "30px", // Adjust font size as needed
          fontWeight: 500, // Make slightly bold
          color: "#333", // Adjust color for better contrast
          lineHeight: "1.5", // Adjust line height
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis", // Enable truncation
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Subtle background
          borderRadius: "4px", // Add slight border radius
          padding: "5px 10px", // Add some padding
          fontFamily: "'Open Sans', sans-serif",
          color: "#8b8c8969",
        }}
      >
        {title.charAt(0).toUpperCase() + title.substring(1)}
      </Typography>
      <div className="categoryContainer">
        <Stack
          direction={"row"}
          sx={{ overflow: "scroll" }}
          container
          spacing={3}
          mb={0}
          p="15px;"
        >
          {events?.map((event) => {
            return (
              <Grid item key={event._id} xs={12} sm={6} md={5} spacing={3}>
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
