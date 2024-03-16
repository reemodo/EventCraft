import { useMemo, useRef } from "react";
import { Marker, useMapEvents } from "react-leaflet";

export function LocationMarker({ position, setPosition, icon }) {
  const markerRef = useRef(null);

  const map = useMapEvents({
    click() {
      map.flyTo(position, map.getZoom());
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;

        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition]
  );

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      icon={icon}
      ref={markerRef}
    ></Marker>
  );
}
