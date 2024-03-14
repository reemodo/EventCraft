const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "card" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  src: String,
  top: Number,
  left: Number,
  text: String,
  position: String,
  fontSize: Number,
  color: String,
  weight: String,
  fontFamily: String,
  decoration: String,
  borderRadius: String,
  zIndex: Number,
  svgPath: String,
  cssStyle: String,
  type: String,
  width: Number,
  height: Number,
});

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
