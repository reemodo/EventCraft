export const cardFormData = (data) => {
  const formData = new FormData();
  formData.append("img", data.img);
  formData.append("userId", data.userId);
  formData.append("eventId", data.eventId);
  formData.append("backgroundColor", data.backgroundColor);
  formData.append("cssStyle", data.cssStyle);
  formData.append("imgPublicId", data.imgPublicId);

  return formData;
};
