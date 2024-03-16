const express = require("express");
const router = express.Router();
const DBManager = require("../events-DB-Server");
const eventManager = require("../collections-manager/eventCollManager");
const Utilities = require("../../utility");
const eventCollManager = require("../collections-manager/eventCollManager");

const upload = require("../../middleware/multer");

router.get("/DBgenerator", async function (req, res) {
  try {
    await DBManager.reGenerate();
    res.end();
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});
router.get("/:eventId", async function (req, res) {
  try {
    const { eventId } = req.params;
    const event = await eventManager.getEvent(eventId);
    if (event.length) {
      res.send(event[0]);
    } else {
      res.send(null);
    }
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

router.get("/", async function (req, res) {
  try {
    const { id, category, startDate, location, title, userPosition } =
      req.query;
    const event = await eventManager.filterByParams(
      id,
      category,
      startDate,
      location,
      title,
      userPosition
    );
    res.send(event);
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

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

router.post(
  "/",
  Utilities.authenticateToken,
  upload.single("img"),
  async (req, res) => {
    try {
      const newEvent = await eventManager.saveEvent(req);
      res.send(newEvent);
    } catch (error) {
      res.status(500).json({ error: "Failed to create event" });
    }
  }
);

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
  "/joinEvent/:eventId/:userId",
  Utilities.authenticateToken,
  async function (req, res) {
    try {
      const eventId = req.params.eventId;
      const userId = req.params.userId;
      const myJoinedEvent = await eventManager.joinEvent(userId, eventId);
      res.send(myJoinedEvent);
    } catch (err) {
      console.error(err);
      res.status(401).send("bad request");
    }
  }
);

router.post(
  "/cancelJoinedEvent/:eventId/:userId",
  Utilities.authenticateToken,
  async function (req, res) {
    try {
      const eventId = req.params.eventId;
      const userId = req.params.userId;
      const myJoinedEvent = await eventManager.cancelJoinEvent(userId, eventId);
      res.send(myJoinedEvent);
    } catch (err) {
      console.error(err);
      res.status(401).send({ message: "bad request" });
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
router.put("/:eventId", Utilities.authenticateToken, async function (req, res) {
  try {
    const eventId = req.params.eventId;

    const updatedEvent = await eventCollManager.updateEventFields({
      ...req.body,
      eventId,
    });
    res.status(200).send(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});
module.exports = router;
