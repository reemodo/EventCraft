import React, { useEffect, useState } from "react";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useParams } from "react-router-dom";
import { useEventHelpers } from "../hooks/useEventHelper";
import { rdxEventsActions } from "../rdx/events.rdx";
import { useDispatch } from "react-redux";
import Layout from "../../landing/Layout";
import { Icon } from "leaflet";

import { formatDate } from "../../shared/dayjs.utils";

import "leaflet/dist/leaflet.css";
import {
  getEventLocationLat,
  getEventLocationLng,
  getEventLocationTitle,
} from "../event.utils";

function EventPage({ imageUrl, lat, lng }) {
  const { id } = useParams();
  const { getEvent, pendingGetEvent } = useEventHelpers();
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38],
  });
  const [event, setEvent] = useState();

  const position = [
    getEventLocationLat(event?.location) || lat,
    getEventLocationLng(event?.location) || lng,
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (id) {
        const eventData = await getEvent(id);
        if (eventData) {
          setEvent(eventData);
          dispatch(rdxEventsActions.setSelectedEvent(eventData));
        }
      }
    })();
  }, [id, getEvent, dispatch]);
  if (pendingGetEvent) return <div>Loading...</div>;
  if (!event || event.length === 0) {
    return <div>empty</div>;
  }
  return (
    <>
      <Layout>
        <CardMedia
          component="img"
          sx={{
            width: "100vh",
            objectFit: "cover",
            height: "550px",
            margin: "auto",
          }}
          image={event.card.img}
          alt="Event"
        />
        <CardContent sx={{ flex: "1" }}>
          <Typography variant="h5" component="div" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Additional Information:</strong>
            <br />
            {event.description}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            <strong>startDate:</strong> {formatDate(event.startDate)}
            <br />
            <strong xs={{ paddingRight: 50 }}>EndDate:</strong>{" "}
            {formatDate(event.endDate)}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            <strong>Location:</strong>
            {getEventLocationTitle(event?.location)}
          </Typography>

          <MapContainer
            center={position}
            zoom={17}
            style={{
              width: 1000,
              height: 300,
              margin: "auto",
              marginBottom: 10,
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
              <Popup>Hello I'm Here!</Popup>
            </Marker>
          </MapContainer>
        </CardContent>
      </Layout>
    </>
  );
}

export default EventPage;
