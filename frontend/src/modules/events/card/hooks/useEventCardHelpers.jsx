import React, { useCallback, useState } from "react";
import { useLazyGetEventCardQuery } from "../api/eventCard.api";

export const useEventCardHelpers = () => {
  const [pendingGetEventCard, setPendingEventCard] = useState(false);
  const [isErrorGetEventCard, setIsErrorEventCard] = useState(false);

  const [getEventCardApi] = useLazyGetEventCardQuery();

  const getEventCard = useCallback(
    async (id) => {
      setPendingEventCard(true);
      setIsErrorEventCard(false);
      try {
        const eventCard = await getEventCardApi(id);

        return eventCard.data;
      } catch (e) {
        console.log("🚀 ~ getEventCard ~ e:", e);
        setIsErrorEventCard(true);
      } finally {
        setPendingEventCard(false);
      }
    },
    [getEventCardApi]
  );

  return { getEventCard, pendingGetEventCard, isErrorGetEventCard };
};
