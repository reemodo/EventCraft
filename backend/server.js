const express = require("express");
const app = express();
const api = require("./server/routes/events_API");
const userAPI = require("./server/routes/users_API");
const cardAPI = require("./server/routes/cards_API");
const itemAPI = require("./server/routes/items_API");
const redALertAPI = require("./server/routes/redAlert_API")

const path = require("path");
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
app.use("/events", api);
app.use("/user", userAPI);
app.use("/cards", cardAPI);
app.use("/items", itemAPI);
app.use("/redAlert", redALertAPI)

dbManager.connectToDB();

app.listen(process.env.PORT || port, function () {
  console.log(`Running on port ${port}`);
});
