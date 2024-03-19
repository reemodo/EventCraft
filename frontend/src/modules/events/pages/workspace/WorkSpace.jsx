import React, { useState, useEffect } from "react";
import { Events } from "../../components/Events/Events";
import "./workSpace.css";

import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Alert } from "@mui/material";
import { useGetMyEvents } from "../../hooks/useGetMyEvents";
import { useNavigate } from "react-router-dom";
import SearchBar from "../home/SearchBar";

export const WorkSpace = (props) => {
  const navigate = useNavigate();
  const [filteredEvents, setFilteredEvents] = useState({});
  const [eventsList, setEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [snackbarMessage, setSnackbarMessage] = useState("Event Added Succefully");

  const { fetchMyEvents } = useGetMyEvents();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMyEvents();
        setEventsList(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    })();
  }, [fetchMyEvents]);

  const onDeleteEvent = function (eventId) {
    const newEvents = eventsList.filter((event) => event._id !== eventId);
    setEventsList(newEvents);
    setSnackbarMessage("Event deleted successfully.");
    setSnackbarOpen(true);
  };

  const handelSearch = (title) => {
    const newFilter = { ...filteredEvents, title };
    setFilteredEvents(newFilter);
  };

  const onOpenCreateModel = () => {
    navigate("/addEvent");
  };

  return (
    <>
      <Stack m={5}>
        <Typography
          fontSize={"3vw"}
          fontFamily={"Lora"}
          fontWeight={900}
          component="h1"
          mb={3}
          m='9%'
          variant="h6"
          alignSelf={"center"}
        >
          Which event you will manage today
        </Typography>
        {eventsList.length === 0 ? <>
          <Box sx={{
            height: ' 50%;',
            display: 'flex;',
            flexDirection: 'row;',
            justifyContent: 'space-evenly;',
            margin: ' 5%;',
            padding: '4%;',
            alignContent: 'center'
          }}>

            <Typography sx={{ fontSize: " 2vw;", fontFamily: 'Quintessential;', height: '50vh;' }}>
              Let's Begin: Create Your First Event Today
            </Typography>
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
                fontSize: '1.2vw;',
                fontFamily: 'Quintessential;',
                height: 'fit-content;'
              }}
              variant="contained"
              className="addButton"
            >
              Add Event
            </Button>
          </Box>
        </>
          :
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
                fontSize: '1.7vw;',
                fontFamily: 'Quintessential;',
                height: 'fit-content;'
              }}
              variant="contained"
              className="addButton"
            >
              Add Event
            </Button>
          </div>
        }
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%", color: "green" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
