const jwt = require("jsonwebtoken");
const secretKey = "my_secret_key";
const filterAllEventsField = function (startDate, endDate, location, category) {
  const filter = {};
  if (startDate) {
    filter.startDate = startDate;
  }
  if (endDate) {
    filter.endDate = endDate;
  }
  if (location) {
    filter.location = location;
  }
  if (category) {
    filter.category = category;
  }

  return filter;
};

const authenticateToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.user = user;
    next();
  });
};

const findUpdatedFields = function (backgroundColor, cssStyle, img) {
  const filter = {};
  if (backgroundColor) {
    filter.backgroundColor = backgroundColor;
  }
  if (cssStyle) {
    filter.cssStyle = cssStyle;
  }
  if (img) {
    filter.img = img;
  }

  return filter;
};
module.exports = { filterAllEventsField, authenticateToken, findUpdatedFields };
