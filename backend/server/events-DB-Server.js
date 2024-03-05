const mongoose = require("mongoose");
const fs = require("fs");
const User = require("../models/user");
const Event = require("../models/event");
const Card = require("../models/card");
const users = require("../user.json");
const events = require("../event.json");
const cards = require("../cards.json");

class DBManager {
  static connectToDB() {
    mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/EventCraft-DB",
      { useNewUrlParser: true }
    );
  }
  static async generateData() {
    cards.forEach(async (card) => {
      const newCard = new Card(card);
      await newCard.save();
    });
    events.forEach(async (event) => {
      const newEvent = new Event(event);
      await newEvent.save();
    });
    users.forEach(async (user) => {
      const newUser = new User(user);
      await newUser.save();
    });
  }
  static async reGenerate() {
    await User.deleteMany({});
    await Card.deleteMany({});
    await Event.deleteMany({});
    await DBManager.generateData();
  }
}
module.exports = DBManager;
