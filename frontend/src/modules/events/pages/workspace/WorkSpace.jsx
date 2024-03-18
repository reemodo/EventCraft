import React from "react";
import { Events } from "../../components/Events/Events";
import "./workSpace.css";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useEffect } from "react";

import Layout from "../../../landing/Layout";

import { useGetMyEvents } from "../../hooks/useGetMyEvents";
import { useNavigate } from "react-router-dom";
import SearchBar from "../home/SearchBar";

export const WorkSpace = (props) => {
  const navigate = useNavigate();
  const [filteredEvents, setFilteredEvents] = useState({});
  const onOpenCreateModel = () => {
    navigate("/addEvent");
  };

  const [eventsList, setEventsList] = useState([]);

  const { isLoading, error, fetchMyEvents } = useGetMyEvents();

  useEffect(() => {
    (async () => {
      const data = await fetchMyEvents();

      if (data) {
        setEventsList(data);
      }
    })();
  }, [fetchMyEvents]);

  const onDeleteEvent = function (eventId) {
    const newEvents = eventsList.filter((event) => event._id !== eventId);
    setEventsList(newEvents);
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
        <Stack m={5}>
          <Typography fontSize={'3vw'} fontFamily={'Lora'} fontWeight={900} component="h1" mb={3} m={5} variant="h6" alignSelf={'center'}>
            Which event you will manage today
          </Typography>
          <div className="iconContainer">
            <SearchBar handelSearch={handelSearch} />
            <Button
              onClick={onOpenCreateModel}
              sx={{
                color: "secondary.contrastText",
                backgroundColor: "secondary.main",
                "--Grid-borderWidth": "1px",
                borderRadius: "40px",
                borderTop: "var(--Grid-borderWidth) solid",
                borderLeft: "var(--Grid-borderWidth) solid",
                borderRight: "var(--Grid-borderWidth) solid",
                borderBottom: "var(--Grid-borderWidth) solid",
                borderColor: "secondary.main",
                minWidth: "fit-content",
                minHeight: "fit-content",
              }}
              variant="contained"
              className="addButton"
            >
              Add Event
            </Button>
          </div>
          {!isLoading && (
            <Events
              inHomePage={false}
              events={eventsList}
              handelSetEventLists={onDeleteEvent}
            />
          )}
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress color="secondary" />
            </Box>
          )}
        </Stack>
      </Layout>
    </>
  );
};
