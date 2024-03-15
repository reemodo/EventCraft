import { useEffect, useState } from 'react';

const useExtractLocations = (events) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const extractLocations = () => {
      const locationsSet = new Set();
      events.forEach(event => {
        if(event != "")
          locationsSet.add(event.location);
      });
      return Array.from(locationsSet);
    };

    if (events && events.length > 0) {
      setLocations(extractLocations());
    }
  }, [events]);

  return locations;
};

export default useExtractLocations;