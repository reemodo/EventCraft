const filterAllEventsField = function (date, location, category) {
  const filter = {};
  if (date) {
    filter.date = date;
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
