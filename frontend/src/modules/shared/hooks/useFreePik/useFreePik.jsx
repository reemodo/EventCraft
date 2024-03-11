// https://api.freepik.com/v1/resources?locale=en-US&page=1&limit=10&order=latest&term=flower

import axios from "axios";

const baseUrl =
  "https://api.freepik.com/v1/resources?locale=en-US&page=1&limit=10&order=latest&term=shapes&type=icon";

export const getShapes = async () => {
  const shapes = await axios.get(baseUrl, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Freepik-API-Key": process.env.REACT_APP_FREE_PIK_API_KEY,
    },
  });
  return shapes;
};
