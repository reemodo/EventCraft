import { useEffect, useState } from 'react';

const useExtractCategories = (events) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const extractCategories = () => {
      const categoriesSet = new Set();
      events.forEach(event => {
        if(event != "")
          categoriesSet.add(event.category);
      });
      return Array.from(categoriesSet);
    };

    if (events && events.length > 0) {
      setLocations(extractCategories());
    }
  }, [events]);

  return locations;
};

export default useExtractCategories;