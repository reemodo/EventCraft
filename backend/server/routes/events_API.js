const express = require("express");
const router = express.Router();
const DBManager = require("../events-DB-Server");
const eventManager = require("../collections-manager/eventCollManager");
const { route } = require("./authRoutes");

router.get("/DBgenerator", async function (req, res) {
  try {
    
    await DBManager.reGenerate();
    res.end()
    } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

router.get("/:eventId", async function (req, res) {
  try {
    const event = await eventManager.getEvents();
    res.send(event);
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  }
});

router.delete("/:eventId", async function(req, res){
  try{
    const eventId = req.params.eventId;
    const deleteEvent = await eventManager.deleteEvent(eventId)
    res.send(deleteEvent)
  } catch(err){
    console.error(err)
  }
});

router.post("/", async (req, res) => {
  try {

      const eventData = req.body;
      const newEvent = await eventManager.saveEvent(eventData);
      res.json(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Failed to create event" });
  }
});

router.get("/:userId",async function(req,res){
  try {
    const userId = req.params.userId;
    const myEvent = await eventManager.myEvents(userId);
    res.send();
  } catch (err) {
    console.error(err);
    res.status(400).send((err) => err);
  } 
})

router.get("", async function(req,res){
  try{
    const lastEvent = await eventManage.findTheLastEvent()
  } catch (err){
    console.error(err)
    res.status(400).send((err) => err);
  }
});

module.exports = router;