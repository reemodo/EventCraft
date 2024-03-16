import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useEventHelpers } from "../../hooks/useEventHelper";
import { useParams } from "react-router-dom";
import { EventAttendanceTable } from "../../components/EventAttendanceTable/EventAttendanceTable";
import Layout from "../../../landing/Layout";
import { Card } from "@mui/material";

export const EventAttendeesPage = () => {
  const { id } = useParams();
  const { getEvent, pendingGetEvent } = useEventHelpers();

  const [event, setEvent] = useState();

  const dispatch = useDispatch();

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

  return (
    <Layout>
      <Card>
        {!!event?.attendance && (
          <EventAttendanceTable
            attendees={event?.attendance.map((att) => ({
              ...att,
              id: att._id,
            }))}
            loading={pendingGetEvent}
          />
        )}
      </Card>
    </Layout>
  );
};
