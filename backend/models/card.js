const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardItemSchema = new Schema({
  _id: Number,
  type: { type: String, enum: ["text", "image"] },
  src: String,
  text: String,
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  textSize: Number,
});

const CardSchema = new Schema({
  _id: Number,
  userId: Number,
  eventId: Number,
  img: String,
  cardItems: [
    {
      type: Schema.Types.Mixed,
      default: [],
    },
  ],
  createdAt: Date,
  backgroundColor: String,
  cssStyle: String,
});

const card = mongoose.model("card", CardSchema);
module.exports = card;
