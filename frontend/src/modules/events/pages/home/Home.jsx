import React, { useState } from "react";
import { Events } from "../../components/Events/Events";
import "./home.css";
import { useEffect } from "react";
import Layout from "../../../landing/Layout";
import { TopContainer } from "./TopContainer";
import { useGetEvents } from "../../hooks/useGetEvents";
import FilterForm from "./FilterForm";
import SearchBar from "./SearchBar";
import { OurServicesList } from "./OurServicesList";
import { Typography, Box } from "@mui/material";
import { useGeolocation } from "../../../shared/hooks/useGeolocation/useGeolocation";

export function Home(props) {
  const [eventsList, setEventsList] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState({});

  const { isLoading, error, fetchEvents } = useGetEvents();

  const { currentPosition } = useGeolocation({
    disable: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchEvents({
          ...filteredEvents,
          userPosition: currentPosition,
        });

        if (data) {
          setEventsList(data);
        }
      } catch {}
    })();
  }, [currentPosition, fetchEvents, filteredEvents]);

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
      <TopContainer events={eventsList} handelSearch={handelSearch} />
      <Layout>
        <div className="joinContainer">
        <div className="joinHeader">
        <Typography variant="h3"           fontFamily= "Quintessential">
          Join Great Events
        </Typography>
        </div>
        <Box className="searchContainer" sx={{justifyContent: 'space-around', flexGrow: 10 , paddingLeft: '', flexDirection:'row', display:'flex'}}>
        <SearchBar handelSearch={handelSearch} handleFilter={handleFilter}  events={eventsList} />
        <FilterForm onFilter={handleFilter}  eventsList={eventsList} />
        </Box>
        <div className="homeContainer">
          <Events
            inHomePage={true}
            events={eventsList}
            onJoinEvent={onJoinEvent}
            onCancelJoinEvent={onCancelJoinEvent}
          />
        </div>
        </div>
        <OurServicesList/>
      </Layout>
    </>
  );
}
