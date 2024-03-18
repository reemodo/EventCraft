import { useCallback } from "react";
import { useLazyGetEventsQuery } from "../api/events.api";
import { localStorageSvc } from "../../shared/LocalStorageSvc/LocalStorageSvc";
import { LOCAL_STORAGE_KEYS } from "../../shared/consts";

export const useGetEvents = () => {
  const userId = localStorageSvc.get(LOCAL_STORAGE_KEYS.USER)?.data?.id;
  const [getEvents, { isLoading, error }] = useLazyGetEventsQuery();

  const fetchEvents = useCallback(async (filter) => {
    if (userId) {
      try {
        filter.id = userId;
        const eventData = await getEvents(filter);
        return eventData.data;
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    } else {
      try {
        const eventData = await getEvents(filter);
        return eventData.data;
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
  }, [getEvents, userId]);
  // Fetch events on component mount or when userId changes

  // Return isLoading, error, and eventsData for component to use
  return { isLoading, error, fetchEvents };
};
