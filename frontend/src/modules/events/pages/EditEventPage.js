import React, { useEffect, useState } from "react";
import Layout from "../../landing/Layout";
import { EventForm } from "../components/EventForm/EventForm";
import { useEventHelpers } from "../hooks/useEventHelper";
import { rdxEventsActions } from "../rdx/events.rdx";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
function EditEventPage({ props }) {
  const { id } = useParams();
  const [event, setEvent] = useState();

  const { getEvent, pendingGetEvent } = useEventHelpers();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (id) {
        const eventData = await getEvent(id);
        if (eventData) {
          setEvent((prev) => {
            if (!prev) {
              return eventData;
            } else {
              return prev;
            }
          });
          // dispatch(rdxEventsActions.setSelectedEvent(eventData));
        }
      }
    })();
  }, [id, getEvent, dispatch]);

  return (
    <Layout>
       <Box m={5} mt={10}>
      <EventForm model={event} isAddFlow={!id} />
      </Box>
    </Layout>
  );
}

export default EditEventPage;
