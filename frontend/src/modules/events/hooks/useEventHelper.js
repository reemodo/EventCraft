import React, { useCallback, useState } from "react";
import { useLazyGetEventQuery } from "../api/events.api";

export const useEventHelpers = () => {
  const [pendingGetEvent, setPendingEvent] = useState(false);
  const [isErrorGetEvent, setIsErrorEvent] = useState(false);

  const [getEventApi] = useLazyGetEventQuery();

  const getEvent = useCallback(
    async (id) => {
      setPendingEvent(true);
      setIsErrorEvent(false);
      try {
        const eventData = await getEventApi(id);

        return eventData.data;
      } catch (e) {
        console.log("🚀 ~ getEvent ~ e:", e);
        setIsErrorEvent(true);
      } finally {
        setPendingEvent(false);
      }
    },
    []
  );

  return { getEvent, pendingGetEvent, isErrorGetEvent };
};
