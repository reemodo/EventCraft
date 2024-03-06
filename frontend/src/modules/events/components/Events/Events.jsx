import React from "react";
import { useGetEventsQuery } from "../../api/events.api";
import { Event } from "./Event";
import dummyData from "./../../../../event";
export const Events = () => {
  // const { data: events, isLoading } = useGetEventsQuery();
  
  // const eventRdx = useSelector((state) => state.events); //only for demonstration
  // return <div>{eventRdx.selectedEvent.name}</div>;
  return (<>
            {dummyData.map(event => <Event event = {event}  key={event.id} /> )}
          </>
  )
};
