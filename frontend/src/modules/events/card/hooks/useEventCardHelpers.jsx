import React, { useCallback, useState } from "react";
import { useLazyGetEventCardQuery } from "../api/eventCard.api";

export const useEventCardHelpers = () => {
  const [pendingGetEventCard, setPendingEventCard] = useState(false);

  const [getEventCardApi] = useLazyGetEventCardQuery();

  const getEventCard = useCallback(async () => {
    setPendingEventCard();
    try {
      const eventCard = await getEventCardApi();

      return eventCard;
    } catch (e) {}
  }, []);

  return <div>useEventCardHelpers</div>;
};
