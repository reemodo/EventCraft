const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  _id: Number,
  userId: Number,
  title: String,
  description: String,
  location: String,
  date: Date,
  duration: Number,
  cardID: Number,
  attendance: [Number],
  category: String,
  createdAt: Date,
});

const event = mongoose.model("event", EventSchema);
module.exports = event;
