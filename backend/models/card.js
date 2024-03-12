const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemSchema = require("../models/Item");

const CardSchema = new Schema({
  _id: Number,
  userId: Number,
  eventId: Number,
  img: String,
  cardItems: [ItemSchema],
  createdAt: Date,
  backgroundColor: String,
  cssStyle: String,
});

const card = mongoose.model("card", CardSchema);
module.exports = card;
