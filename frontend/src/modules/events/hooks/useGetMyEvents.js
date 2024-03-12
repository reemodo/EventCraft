import { useCallback, useState } from "react";
import { useLazyGetMyEventsQuery } from "../api/events.api";
import { localStorageSvc } from "../../shared/LocalStorageSvc/LocalStorageSvc";
import { LOCAL_STORAGE_KEYS } from "../../shared/consts";


export const useGetMyEvents =  () => {

  const userId = localStorageSvc.get(LOCAL_STORAGE_KEYS.USER)?.data?.id;
  const [getMyEvents, { isLoading, error }] = useLazyGetMyEventsQuery();

  const fetchMyEvents = useCallback(async () => {
    if (userId) {
      try {
        const eventData = await getMyEvents(userId);
        return eventData.data;
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    else{
      alert('you need to log in')
    }
  }
  ,[])
  // Fetch events on component mount or when userId changes

  // Return isLoading, error, and eventsData for component to use
  return { isLoading, error, fetchMyEvents };
};

