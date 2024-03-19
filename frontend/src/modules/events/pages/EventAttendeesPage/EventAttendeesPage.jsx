import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useEventHelpers } from "../../hooks/useEventHelper";
import { useParams } from "react-router-dom";
import { EventAttendanceTable } from "../../components/EventAttendanceTable/EventAttendanceTable";
import Layout from "../../../landing/Layout";
import { Box, Button, Card } from "@mui/material";
import SearchBar from "../home/SearchBar";

export const EventAttendeesPage = () => {
  const { id } = useParams();
  const { getEvent, pendingGetEvent } = useEventHelpers();

  const [event, setEvent] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const attendees = event?.attendance.filter((attendee) =>
    attendee.name.includes(searchTerm)
  );

  useEffect(() => {
    (async () => {
      if (id) {
        const eventData = await getEvent(id);

        if (eventData) {
          setEvent(eventData);
        }
      }
    })();
  }, [id, getEvent, dispatch]);

  const onSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Layout>
      <Card>
        <Box
          sx={{
            mb: 2,
            mt: 2,
          }}
        >
          <SearchBar handelSearch={onSearch} />
        </Box>
        {!!event?.attendance && (
          <EventAttendanceTable
            attendees={attendees.map((att) => ({
              ...att,
              id: att._id,
            }))}
            loading={pendingGetEvent}
          />
        )}
      </Card>
      <Button>hello</Button>
    </Layout>
  );
};
