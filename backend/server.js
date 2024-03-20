const express = require("express");
const path = require("path");
const api = require("./server/routes/events_API");
const userAPI = require("./server/routes/users_API");
const cardAPI = require("./server/routes/cards_API");
const cloudAPI = require("./server/routes/cloud_API");
const itemAPI = require("./server/routes/items_API");
const externalAPI = require("./server/routes/external_API");
const dbManager = require("./server/events-DB-Server");
const { port } = require("./constants");

const app = express();

// Middleware to allow cross-origin requests (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define API routes
app.use("/events", api);
app.use("/user", userAPI);
app.use("/cards", cardAPI);
app.use("/cloud", cloudAPI);
app.use("/items", itemAPI);
app.use("/external", externalAPI);

// Connect to the database
dbManager.connectToDB();

// Fallback route for API requests
app.get('/api/*', (req, res) => {
  res.status(404).send('API route not found');
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start the server
app.listen(process.env.PORT || port, function () {
  console.log(`Server is running on port ${port}`);
});
