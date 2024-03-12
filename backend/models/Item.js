const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  _id: Number,
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: "card" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  src: String,
  top: String,
  left: String,
  fontSize: String,
  color: String,
  weight: String,
  fontFamily: String,
  decoration: String,
  borderRadius: String,
  zIndex: String,
  svgPath: String,
  cssStyle: String,
  type: String,
});

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
