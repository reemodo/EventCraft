export const eventFormData = (data) => {
  const formData = new FormData();
  formData.append("img", data.img);
  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("description", data.description);
  formData.append("location", data.location);
  formData.append("startDate", data.startDate);
  formData.append("endDate", data.endDate);
  formData.append("userId", data.userId);
  formData.append("isPublic", data.isPublic);
  formData.append("card", JSON.stringify(data.card));

  return formData;
};

export const getEventLocationTitle = (location) => {
  return location?.split(":")[0];
};
export const getEventLocationLat = (location) => {
  return location?.split(":")[1];
};

export const getEventLocationLng = (location) => {
  return location?.split(":")[2];
};
