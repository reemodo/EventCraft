import { useCallback, useState } from "react";
import {
  useCancelJoinedEventMutation,
  useJoinEventMutation,
  useLazyGetEventQuery,
} from "../api/events.api";

export const useEventHelpers = () => {
  const [pendingGetEvent, setPendingEvent] = useState(false);
  const [isErrorGetEvent, setIsErrorEvent] = useState(false);
  const [pendingJoinEvent, setPendingJoinEvent] = useState(false);
  const [pendingCancelJoinedEvent, setPendingCancelJoinedEvent] =
    useState(false);

  const [getEventApi] = useLazyGetEventQuery();

  const [joinEventApi] = useJoinEventMutation();

  const [cancelJoinEventApi] = useCancelJoinedEventMutation();

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

  const cancelJoinedEvent = useCallback(
    async (userId, eventId) => {
      try {
        setPendingCancelJoinedEvent(true);
        const eventJoined = await cancelJoinEventApi({ userId, eventId });
        return eventJoined.data;
      } catch (err) {
        console.log("🚀 ~ joinEvent ~ err:", err);
      } finally {
        setPendingCancelJoinedEvent(false);
      }
    },
    [cancelJoinEventApi]
  );

  return {
    getEvent,
    joinEvent,
    cancelJoinedEvent,
    pendingGetEvent,
    isErrorGetEvent,
    pendingJoinEvent,
    pendingCancelJoinedEvent,
  };
};
