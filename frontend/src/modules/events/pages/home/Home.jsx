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
import { Typography, Box, CircularProgress, Button } from "@mui/material";
import { useGeolocation } from "../../../shared/hooks/useGeolocation/useGeolocation";
import { useNavigate } from "react-router-dom";
export function Home(props) {
  const [eventsList, setEventsList] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState({});

  const { isLoading, error, fetchEvents } = useGetEvents();
  const navigate = useNavigate();
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
      <Layout>
        <div className="joinContainer">
        <div className="video-background">
      <video autoPlay loop muted className="video">
        <source src={require("./IconsSource/planning.mp4")} type="video/mp4" />
        {/* Add additional source elements for different video formats */}
      </video>
      {/* Add other content on top of the video if needed */}
      <div className="content">
      <div className="joinHeader">
            <Typography variant="h3" fontFamily="Quintessential" sx={{letterSpacing:" 0em;",
    fontWeight: "600;",
    fontSize: '4vw;',}}>
              Discover Exciting Events
            </Typography>
            <Typography variant="h5" fontFamily="ui-monospace;" sx={{  fontSize: '2vw;', fontWeight:"900" ,mt: 2,}}>
            Stay Up-to-Date with Nearby Events
              </Typography>
           
          </div>

          <Box
            className="searchContainer"
            sx={{
              paddingLeft: "20px",
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SearchBar
              handelSearch={handelSearch}
              handleFilter={handleFilter}
              events={eventsList}
            />

            <FilterForm onFilter={handleFilter} eventsList={eventsList} />
          </Box>
          </div>
          </div>
          <div className="homeContainer">
            {!isLoading && (
              <Events
                inHomePage={true}
                events={eventsList}
                onJoinEvent={onJoinEvent}
                onCancelJoinEvent={onCancelJoinEvent}
              />
            )}
            {isLoading && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="secondary" />
              </Box>
            )}
          </div>
        </div>
        <OurServicesList />
        
      </Layout>
    </>
  );
}
