const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  cardId: Number,
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

const item = mongoose.model("item", ItemSchema);
module.exports = item;
