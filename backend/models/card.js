const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require("../models/Item");

const CardSchema = new Schema({
  _id: Number,
  userId: Number,
  eventId: Number,
  img: String,
  cardItems: [Item],
  createdAt: Date,
  backgroundColor: String,
  cssStyle: String,
});

const card = mongoose.model("card", CardSchema);
module.exports = card;
