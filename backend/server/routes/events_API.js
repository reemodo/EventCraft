const express = require("express");
const router = express.Router();
const DBManager = require("../events-DB-Server");
const eventManager = require("../collections-manager/eventCollManager");
const Utilities = require("../../utility");

router.get("/DBgenerator", async function (req, res) {
  try {
    await DBManager.reGenerate();
    res.end();
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

router.get(
  "/:category/:startDate/:location",
  Utilities.authenticateToken,
  async function (req, res) {
    try {
      const { category, startDate, location } = req.params;

      console.log(startDate);
      const event = await eventManager.filterByParams(
        category,
        startDate,
        location
      );
      res.send(event);
    } catch (err) {
      console.error(err);
      res.status(400).send((err) => err);
    }
  }
);

router.delete(
  "/:eventId",
  Utilities.authenticateToken,
  async function (req, res) {
    try {
      const eventId = req.params.eventId;
      const deletedEvent = await eventManager.deleteEvent(eventId);
      res.send(deletedEvent);
    } catch (err) {
      console.error(err);
    }
  }
);

router.post("/", Utilities.authenticateToken, async (req, res) => {
  try {
    const newEvent = await eventManager.saveEvent(req.body);
    res.send(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

router.get(
  "/myEvents/:userId",
  Utilities.authenticateToken,
  async function (req, res) {
    try {
      const userId = req.params.userId;
      const myEvent = await eventManager.myEvents(userId);
      res.send(myEvent);
    } catch (err) {
      console.error(err);
      res.status(400).send((err) => err);
    }
  }
);
router.get(
  "/joinedEvents/:userId",
  Utilities.authenticateToken,
  async function (req, res) {
    try {
      const userId = req.params.userId;
      const myJoinedEvent = await eventManager.findJoinedEvents(userId);
      res.send(myJoinedEvent);
    } catch (err) {
      console.error(err);
      res.status(400).send((err) => err);
    }
  }
);
router.post(
  "/:userId/:eventId",
  Utilities.authenticateToken,
  async function (req, res) {
    try {
      const userId = req.params.userId;
      const eventId = req.params.eventId;
      const message = await eventManager.joinEvents(eventId, userId);
      res.send(message);
    } catch (err) {
      console.error(err);
      res.status(400).send((err) => err);
    }
  }
);

module.exports = router;
