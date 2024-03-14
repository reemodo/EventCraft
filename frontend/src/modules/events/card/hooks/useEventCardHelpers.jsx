import React, { useCallback, useState } from "react";
import {
  useLazyGetEventCardQuery,
  useUpdateEventCardMutation,
} from "../api/eventCard.api";

export const useEventCardHelpers = () => {
  const [pendingGetEventCard, setPendingEventCard] = useState(false);
  const [pendingUpdateEventCard, setPendingUpdateEventCard] = useState(false);
  const [isErrorGetEventCard, setIsErrorEventCard] = useState(false);

  const [getEventCardApi] = useLazyGetEventCardQuery();
  const [updateEventCardApi] = useUpdateEventCardMutation();

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

  const updateEventCard = useCallback(
    async (data) => {
      setPendingUpdateEventCard(true);

      try {
        const eventCard = await updateEventCardApi(data);

        return eventCard.data;
      } catch (e) {
        console.log("🚀 ~ getEventCard ~ e:", e);
      } finally {
        setPendingEventCard(false);
      }
    },
    [updateEventCardApi]
  );

  return {
    getEventCard,
    pendingGetEventCard,
    isErrorGetEventCard,
    updateEventCard,
    pendingUpdateEventCard,
  };
};
