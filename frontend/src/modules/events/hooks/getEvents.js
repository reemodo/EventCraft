import { useCallback, useState } from "react";
import { useLazyGetEventsQuery } from "../api/events.api";
import { localStorageSvc } from "../../shared/LocalStorageSvc/LocalStorageSvc";
import { LOCAL_STORAGE_KEYS } from "../../shared/consts";


export const useIsLoggedIn =  () => {

  const userId = localStorageSvc.get(LOCAL_STORAGE_KEYS.USER)?.data?.id;
  const [getEvents, { isLoading, error }] = useLazyGetEventsQuery();

  const fetchEvents = useCallback(async () => {
    if (userId) {
      try {
        const eventData = await getEvents(userId);
        return eventData.data;
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    else{
      try {
        const eventData = await getEvents();
        return eventData.data;
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
  }
  ,[])
  // Fetch events on component mount or when userId changes

  // Return isLoading, error, and eventsData for component to use
  return { isLoading, error, fetchEvents };
};

