import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux";
import  Landing  from '../../landing/Landing';

function EventPage({ imageUrl, lat, lng }) {
    const position = [lat, lng]
    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        iconSize: [38, 38]
    });

    const selectedEvent = useSelector((state) => state.events);
    const event = selectedEvent.selectedEvent;
    return (
        <>
        
        <Landing>
                <CardMedia
                    component="img"
                    sx={{ width: '100vh', objectFit: 'cover', height: '250px', margin: 'auto' }}
                    image={imageUrl}
                    alt="Event"
                />
                <CardContent sx={{ flex: '1' }}>
                    <Typography variant="h5" component="div" gutterBottom>
                        {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Additional Information:</strong><br />
                        {event.info}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        <strong>Date & Time:</strong> {event.startDate}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        <strong>Location:</strong> {event.location}
                    </Typography>
                </CardContent>
      
            <MapContainer center={position} zoom={17} style={{ width: 1000, height: 300, margin: 'auto' }} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={customIcon}>
                    <Popup>Hello I'm Here!</Popup>
                </Marker>
            </MapContainer>
        </Landing>
        </>
    );
}

export default EventPage;



