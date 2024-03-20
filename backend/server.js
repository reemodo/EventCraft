const express = require("express");
const path = require("path");
const app = express();
const api = require("./server/routes/events_API");
const userAPI = require("./server/routes/users_API");
const cardAPI = require("./server/routes/cards_API");
const cloudAPI = require("./server/routes/cloud_API");
const itemAPI = require("./server/routes/items_API");
const externalAPI = require("./server/routes/external_API");
const dbManager = require("./server/events-DB-Server");
const { port } = require("./constants");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Define your API routes
app.use("/events", api);
app.use("/user", userAPI);
app.use("/cards", cardAPI);
app.use("/cloud", cloudAPI);
app.use("/items", itemAPI);
app.use("/external", externalAPI);

dbManager.connectToDB();

// Fallback route to serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || port, function () {
  console.log(`Running on port ${port}`);
});