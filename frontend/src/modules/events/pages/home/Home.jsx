import React, { useState } from "react";
import { Events } from "../../components/Events/Events";
import "./home.css";
import { useEffect } from "react";
import Layout from "../../../landing/Layout";
import { TopContainer } from "./TopContainer";
import { useGetEvents } from "../../hooks/useGetEvents";
import FilterForm from './FilterForm';
import SearchBar from "./SearchBar";
import { OurServicesList } from "./OurServicesList";
import { Typography } from "@mui/material";


export function Home(props) {
  const [eventsList, setEventsList] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState({});

  const { isLoading, error, fetchEvents } = useGetEvents();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchEvents(filteredEvents);

        if (data) {
          setEventsList(data);
        }
      } catch {}
    })();
  }, [fetchEvents, filteredEvents]);

  const onJoinEvent = (event, userId) => {
    const eventsListClone = [...eventsList];
    const idx = eventsListClone.findIndex((evt) => event._id === evt._id);

    const updatedEvent = { ...eventsListClone[idx] };

    updatedEvent.attendance = [...updatedEvent.attendance, { _id: userId }];

    eventsListClone.splice(idx, 1, updatedEvent);

    setEventsList(eventsListClone);
  };

  const onCancelJoinEvent = (event, userId) => {
    const eventsListClone = [...eventsList];
    const idx = eventsListClone.findIndex((evt) => event._id === evt._id);

    const updatedEvent = { ...eventsListClone[idx] };

    updatedEvent.attendance = [
      ...updatedEvent.attendance.filter((user) => user._id !== userId),
    ];

    eventsListClone.splice(idx, 1, updatedEvent);

    setEventsList(eventsListClone);
  };

  const handleFilter = (filters) => {
    const newFilter = { ...filters, title: filteredEvents.title };
    setFilteredEvents(newFilter);
  };

  const handelSearch = (title) => {
    const newFilter = { ...filteredEvents, title };
    setFilteredEvents(newFilter);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <TopContainer events={eventsList}  handelSearch={handelSearch}/>
      <Layout>
        <OurServicesList/>
        <div className="joinHeader">
        <Typography variant="h3">
          Join Great Events
        </Typography>
        <div className="searchContainer">
        <SearchBar handelSearch={handelSearch}/>
        </div>
        </div>
        <div className="homeContainer">
          <Events
            inHomePage={true}
            events={eventsList}
            onJoinEvent={onJoinEvent}
            onCancelJoinEvent={onCancelJoinEvent}
          />
        </div>
      </Layout>
    </>
  );
}
