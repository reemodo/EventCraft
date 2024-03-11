const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  _id: Number,
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

module.exports = ItemSchema;
