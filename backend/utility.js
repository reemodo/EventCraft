const jwt = require("jsonwebtoken");
const secretKey = "my_secret_key";
const filterAllEventsField = function (filterParams) {
  const filter = {};
  if (filterParams.startDate) {
    filter.startDate = filterParams.startDate;
  }
  if (filterParams.endDate) {
    filter.endDate = filterParams.endDate;
  }
  if (filterParams.location) {
    const regexPattern = new RegExp(`^${filterParams.location}`, "i");
    filter.location = { $regex: regexPattern };
  }
  if (filterParams.category) {
    filter.category = filterParams.category;
  }
  if (filterParams.description) {
    filter.description = filterParams.description;
  }
  if (filterParams.title) {
    const regexPattern = new RegExp(`^${filterParams.title}`, "i");
    filter.title = { $regex: regexPattern };
  }
  if (filterParams.id) filter.userId = filterParams.id;

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

const findUpdatedItemFields = function (newPosition) {
  const updateFields = {};
  for (const key in newPosition) {
    if (newPosition[key] !== undefined) {
      updateFields[`cardItems.$.${key}`] = newPosition[key];
    }
  }
  return updateFields;
};
module.exports = {
  filterAllEventsField,
  authenticateToken,
  findUpdatedFields,
  findUpdatedItemFields,
};
