import React from "react";

export const Event = ({event}) => {
  return (
  <>
  <div>{event.title}</div>
  <div>{event.description}</div>
  <div>{event.location}</div>
  <div>{event.date}</div>
  <div>{event.category}</div>
  </>);
};