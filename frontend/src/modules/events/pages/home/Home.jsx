import React, { useState } from "react";
import { Events } from "../../components/Events/Events";
import "./home.css";
import { useEffect } from "react";
import Layout from "../../../landing/Layout";
import { TopContainer } from "./TopContainer";
import {useIsLoggedIn} from "../../hooks/getEvents";

export function Home(props) {
  const [eventsList, setEventsList] = useState([]);
  const { isLoading, error, fetchEvents } = useIsLoggedIn();

  useEffect(() => {
    (async ()=> { 
      const data = await fetchEvents();

      if (data) {
        setEventsList(data);
      }
    })()
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Layout>
        <TopContainer />
        <div className="homeContainer">
          <Events inHomePage={true} events={eventsList} />
        </div>
      </Layout>
    </>
  );
}
