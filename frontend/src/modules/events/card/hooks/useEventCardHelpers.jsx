import React, { useCallback, useState } from "react";
import { useLazyGetEventCardQuery } from "../api/eventCard.api";

export const useEventCardHelpers = () => {
  const [pendingGetEventCard, setPendingEventCard] = useState(false);

  const [getEventCardApi] = useLazyGetEventCardQuery();

  const getEventCard = useCallback(
    async (id) => {
      setPendingEventCard(true);
      try {
        const eventCard = await getEventCardApi(id);

        return eventCard;
      } catch (e) {
        console.log("🚀 ~ getEventCard ~ e:", e);
      } finally {
        setPendingEventCard(false);
      }
    },
    [getEventCardApi]
  );

  return { getEventCard, pendingGetEventCard };
};
