import React, { useState } from "react";
import { Events } from "../../components/Events/Events";
import "./home.css";
import SearchBar from "./SearchBar";
import useSWR from "swr";
import { useGetEventsQuery } from "./../../api/events.api";
import { useEffect } from "react";
import Landing from "../../../landing/Landing"
import { TopContainer } from "./TopContainer";
export function Home(props) {
  const [eventsList, setEventsList] = useState([]);

  const { data, error, isLoading } = useGetEventsQuery();
  useEffect(() => {
    if (data) setEventsList(data);
  }, [data]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No events found.</div>;
  }

  return (
    <>
    <Landing>
        <TopContainer/>
          <div className="homeContainer">
        
        <Events inHomePage={true} events={eventsList} />
      </div>
    </Landing>
    </>
  );
}
