import React, { useEffect } from "react";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";

import { LocationMarker } from "../LocationMarker/LocationMarker";
import { MapPlaceholder } from "../MapPlaceholder/MapPlaceholder";

export const Map = ({ icon, position, setPosition, isAddFlow }) => {
  useEffect(() => {
    (async () => {
      if (isAddFlow) {
        await navigator.permissions.query({ name: "geolocation" });
        navigator.geolocation.getCurrentPosition((position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    })();
  }, [isAddFlow, setPosition]);

  return (
    <MapContainer
      center={position}
      zoom={17}
      style={{ width: 500, height: 300, margin: "auto" }}
      scrollWheelZoom={true}
      placeholder={<MapPlaceholder />}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        icon={icon}
        position={position}
        setPosition={setPosition}
      />
    </MapContainer>
  );
};
