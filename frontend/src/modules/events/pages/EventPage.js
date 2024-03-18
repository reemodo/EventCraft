import React, { useEffect, useState } from "react";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams } from "react-router-dom";
import { useEventHelpers } from "../hooks/useEventHelper";
import { rdxEventsActions } from "../rdx/events.rdx";
import { useDispatch } from "react-redux";
import Layout from "../../landing/Layout";
import { Icon } from "leaflet";
import { formatDate } from "../../shared/dayjs.utils";
import "leaflet/dist/leaflet.css";
import "./EventPage.css"; // Import your CSS file for additional styling
import { alignProperty } from "@mui/material/styles/cssUtils";

function EventPage({ imageUrl, lat, lng }) {
  const { id } = useParams();
  const { getEvent, pendingGetEvent } = useEventHelpers();
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38],
  });
  const [event, setEvent] = useState();

  const position = [
    event?.location.split(":")[1] || lat,
    event?.location.split(":")[2] || lng,
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
    <Layout>
      <CardMedia
        component="img"
        className="event-image"
        image={event.card.img}
        alt="Event"
      />
      <CardContent>
        <Typography variant="h2" component="div" className="event-title" gutterBottom>
          {event.title}
        </Typography>
        <Typography align="center" variant="h5" color="text.secondary" className="event-description">
          <strong>Additional Information:</strong>
          <br />
          {event.description}
        </Typography>
        <Typography align="center" variant="h5" color="text.secondary" className="event-date">
          <strong >Start Date:</strong> {formatDate(event.startDate)}
  
          <strong >  End Date:</strong> {formatDate(event.endDate)}
        </Typography>
        <Typography align="center" variant="h5" color="text.secondary" className="event-location">
          <strong>Location:</strong>
        </Typography>

        <div className="map-container">
          <MapContainer
            center={position}
            zoom={18}
            className="map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
              <Popup>Hello I'm Here!</Popup>
            </Marker>
          </MapContainer>
        </div>
      </CardContent>
    </Layout>
  );
}

export default EventPage;
