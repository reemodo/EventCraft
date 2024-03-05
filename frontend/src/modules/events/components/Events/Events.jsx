import React from "react";
import { useGetEventsQuery } from "../../api/events.api";

import { useSelector } from "react-redux";

export const Events = () => {
  const { data: events, isLoading } = useGetEventsQuery();

  const eventRdx = useSelector((state) => state.events); //only for demonstration

  return <div>{eventRdx.selectedEvent.name}</div>;
};
