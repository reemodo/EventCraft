const filterAllEventsField = function (startDate, location, category) {
  const filter = {};
  if (startDate) {
    filter.startDate = startDate;
  }
  if (location) {
    filter.location = location;
  }
  if (category) {
    filter.category = category;
  }

  return filter;
};
module.exports = { filterAllEventsField };
