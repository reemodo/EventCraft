import React, { useState } from "react";
import { Events } from "../../components/Events/Events";
import "./home.css";
import { useEffect } from "react";
import Layout from "../../../landing/Layout";
import { TopContainer } from "./TopContainer";
import { useGetEvents } from "../../hooks/useGetEvents";

export function Home(props) {
  const [eventsList, setEventsList] = useState([]);
  const { isLoading, error, fetchEvents } = useGetEvents();

  useEffect(() => {
    (async () => {
      const data = await fetchEvents();

      if (data) {
        setEventsList(data);
      }
    })();
  }, [fetchEvents]);

  const onJoinEvent = (event, userId) => {
    const eventsListClone = [...eventsList];
    const idx = eventsListClone.findIndex((evt) => event._id === evt._id);

    const updatedEvent = { ...eventsListClone[idx] };

    updatedEvent.attendance = [...updatedEvent.attendance, userId];

    eventsListClone.splice(idx, 1, updatedEvent);

    setEventsList(eventsListClone);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Layout>
        <TopContainer />
        <div className="homeContainer">
          <Events
            inHomePage={true}
            events={eventsList}
            onJoinEvent={onJoinEvent}
          />
        </div>
      </Layout>
    </>
  );
}
