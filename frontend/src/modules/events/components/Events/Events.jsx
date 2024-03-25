import React from "react";

import { EventCard } from "./EventCard";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { EventCategoryList } from "./EventCategoryList";

const JOINED_CATEGORY = "joined";

export function Events({
  inHomePage,
  events,
  editModel,
  handelSetEventLists,
  onJoinEvent,
  onCancelJoinEvent,
}) {
  const rdxUser = useSelector((state) => state.user);

  const groupedEvents = events?.length
    ? events?.reduce((event, obj) => {
        const { category, ...rest } = obj;
        if (
          !!obj.attendance?.find((user) => user._id === rdxUser.currentUser.id)
        ) {
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
      <div>
        {groupedEvents[JOINED_CATEGORY]?.length > 0 && (
          <EventCategoryList
            title={JOINED_CATEGORY}
            events={groupedEvents[JOINED_CATEGORY]}
            onJoinEvent={onJoinEvent}
            onCancelJoinEvent={onCancelJoinEvent}
          />
        )}

        {inHomePage ? (
          Object.entries(groupedEvents)?.map(([category, items]) =>
            category !== JOINED_CATEGORY ? (
              <div key={category}>
                <EventCategoryList
                  title={category}
                  events={items}
                  onJoinEvent={onJoinEvent}
                />
              </div>
            ) : (
              <></>
            )
          )
        ) : (
          <Grid
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap;",
              gap: "5em;",
              justifyContent: "center;",
              flexBasis: "fit-content",
            }}
          >
            {events?.map((event, index) => (
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
