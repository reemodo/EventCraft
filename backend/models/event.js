const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  // _id: String,
  userId: String,
  title: String,
  description: String,
  location: String,
  date: Date,
  duration: Number,
  cardID: String,
  attendance: [String],
  category: String,
  createdAt: Date,
});

const event = mongoose.model("event", EventSchema);
module.exports = event;
