import React from "react";
import { Events } from "../../components/Events/Events";
import "./workSpace.css";

import { Icon } from "@mui/material";
import { useState } from "react";
import { EventFormModal } from "../../components/EventFormModal/EventFormModal";
import { useGetMyEventsQuery } from "./../../api/events.api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../../landing/Layout";

export const WorkSpace = (props) => {
  const [OpenCreateModel, setOpenCreateModel] = useState(false);
  const onOpenCreateModel = () => {
    setOpenCreateModel(true);
  };
  const onCloseCreateModel = () => {
    setOpenCreateModel(false);
  };
  const onAddNewEvent = () => {
    setOpenCreateModel(false);
    alert("we add a new event");
  };
  const [eventsList, setEventsList] = useState([]);
  //TODO: UserId should be in state
  const user = useSelector((state) => state.user);
  const userId = user.currentUser.id;
  const { data, error, isLoading } = useGetMyEventsQuery(userId);
  useEffect(() => {
    if (data) setEventsList(data);
  }, [data]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Layout>
        <div className="homeContainer">
          <div className="iconContainer" onClick={onOpenCreateModel}>
            <Icon
              sx={{
                color: "secondary.contrastText",
                backgroundColor: "secondary.main",
                "--Grid-borderWidth": "1px",
                borderRadius: "40px",
                borderTop: "var(--Grid-borderWidth) solid",
                borderLeft: "var(--Grid-borderWidth) solid",
                borderRight: "var(--Grid-borderWidth) solid",
                borderBottom: "var(--Grid-borderWidth) solid",
                borderColor: "secondary.main",
                width: 50,
                height: 50,
                fontSize: "2.3rem",
              }}
            >
              +
            </Icon>
          </div>
          <Events
            inHomePage={false}
            events={eventsList}
            editModel={onOpenCreateModel}
          />
          <EventFormModal
            isOpen={OpenCreateModel}
            onClose={onCloseCreateModel}
            onSubmit={onAddNewEvent}
          />
        </div>
      </Layout>
    </>
  );
};
