import React from "react";

import { EventCard } from "./EventCard";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const JOINED_CATEGORY = "joined";

export function Events({
  inHomePage,
  events,
  editModel,
  handelSetEventLists,
  onJoinEvent,
}) {
  const rdxUser = useSelector((state) => state.user);

  const groupedEvents = events.length
    ? events?.reduce((event, obj) => {
        const { category, ...rest } = obj;
        if (obj.attendance?.includes(rdxUser.currentUser.id)) {
          if (!event[JOINED_CATEGORY]) {
            event[JOINED_CATEGORY] = [rest];
          } else {
            event[JOINED_CATEGORY].push(rest);
          }
        } else if (!event[category]) {
          event[category] = [rest]; // Create a new array for the category
        } else {
          event[category].push(rest); // Push the object to the existing array
        }
        return event;
      }, {})
    : {};

  return (
    <>
      <div className="categoryContainer">
        {groupedEvents[JOINED_CATEGORY]?.length > 0 && (
          <Typography variant="h4" gutterBottom color="">
            {JOINED_CATEGORY.charAt(0).toUpperCase() +
              JOINED_CATEGORY.substring(1)}
          </Typography>
        )}
        <Grid container spacing={3}>
          {groupedEvents[JOINED_CATEGORY]?.length > 0 &&
            groupedEvents[JOINED_CATEGORY]?.map((event) => {
              return (
                <Grid item key={event._id} xs={12} sm={6} md={5} spacing={3}>
                  <EventCard
                    event={event}
                    inHomePage
                    userJoined={event.attendance.includes(
                      rdxUser.currentUser.id
                    )}
                  />
                </Grid>
              );
            })}
        </Grid>

        {inHomePage ? (
          Object.entries(groupedEvents).map(([category, items]) =>
            category !== JOINED_CATEGORY ? (
              <div key={category}>
                <Typography variant="h4" gutterBottom color="">
                  {category.charAt(0).toUpperCase() + category.substring(1)}
                </Typography>
                <Grid container spacing={3}>
                  {items.map((event, index) => (
                    <Grid
                      item
                      key={event._id}
                      xs={12}
                      sm={6}
                      md={5}
                      spacing={3}
                    >
                      <EventCard
                        event={event}
                        inHomePage
                        userJoined={event.attendance?.includes(
                          rdxUser.currentUser.id
                        )}
                        onJoinEvent={onJoinEvent}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ) : (
              <></>
            )
          )
        ) : (
          <Grid container spacing={2}>
            {events.map((event, index) => (
              <Grid item key={index} xs={12} sm={6} md={5}>
                <EventCard
                  event={event}
                  editModel={editModel}
                  handelSetEventLists={handelSetEventLists}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}
