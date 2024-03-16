import React, { useCallback, useEffect, useState } from "react";

export const useGeolocation = ({ disable }) => {
  const [currentPosition, setCurrentPosition] = useState();

  const getCurrentPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const requestPermission = useCallback(async () => {
    const permissionStatus = await navigator.permissions.query({
      name: "geolocation",
    });

    if (permissionStatus.state === "granted") {
      getCurrentPosition();
    }
    return permissionStatus;
  }, [getCurrentPosition]);

  useEffect(() => {
    (async () => {
      if ("geolocation" in navigator) {
        if (!disable) {
          const permissionStatus = await requestPermission();

          if (permissionStatus.state === "prompt") {
            await requestPermission();
          }
        }
      }
    })();
  }, [disable, requestPermission]);
  return {
    currentPosition,
    setCurrentPosition,
  };
};
