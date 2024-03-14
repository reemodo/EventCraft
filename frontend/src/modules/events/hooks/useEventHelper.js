import { useCallback, useState } from "react";
import { useJoinEventMutation, useLazyGetEventQuery } from "../api/events.api";

export const useEventHelpers = () => {
  const [pendingGetEvent, setPendingEvent] = useState(false);
  const [isErrorGetEvent, setIsErrorEvent] = useState(false);
  const [pendingJoinEvent, setPendingJoinEvent] = useState(false);

  const [getEventApi] = useLazyGetEventQuery();

  const [joinEventApi] = useJoinEventMutation();

  const getEvent = useCallback(
    async (id) => {
      setPendingEvent(true);
      setIsErrorEvent(false);
      try {
        const eventData = await getEventApi(id);

        return eventData.data;
      } catch (e) {
        console.log("🚀 ~ getEvent ~ e:", e.stack);
        setIsErrorEvent(true);
      } finally {
        setPendingEvent(false);
      }
    },
    [getEventApi]
  );

  const joinEvent = useCallback(
    async (userId, eventId) => {
      try {
        setPendingJoinEvent(true);
        const eventJoined = await joinEventApi({ userId, eventId });
        return eventJoined.data;
      } catch (err) {
        console.log("🚀 ~ joinEvent ~ err:", err);
      } finally {
        setPendingJoinEvent(false);
      }
    },
    [joinEventApi]
  );

  return {
    getEvent,
    joinEvent,
    pendingGetEvent,
    isErrorGetEvent,
    pendingJoinEvent,
  };
};
