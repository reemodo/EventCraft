const sortByLocation = (a, b, location) => {
  const aLocationArray = a.location.split(":");
  const bLocationArray = b.location.split(":");
  const locationArray = location.split(":");

  const aLat = aLocationArray[1];
  const aLng = aLocationArray[2];
  const bLat = bLocationArray[1];
  const bLng = bLocationArray[2];

  const locationLat = locationArray[1];
  const locationLng = locationArray[2];

  const aMaxDistance = Math.max(
    Math.abs(locationLng - aLng),
    Math.abs(locationLat - aLat)
  );
  const bMaxDistance = Math.max(
    Math.abs(locationLng - bLng),
    Math.abs(locationLat - bLat)
  );

  if (aMaxDistance >= bMaxDistance) {
    return 1;
  } else {
    return -1;
  }
};

const orderEventsByLocation = (events, location) => {
  if (!location) {
    return events;
  }

  events.sort((a, b) => sortByLocation(a.toObject(), b.toObject(), location));
  return events;
};

module.exports = { orderEventsByLocation };
