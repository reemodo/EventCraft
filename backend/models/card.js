const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "event" },
    img: String,
    cardItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],

    backgroundColor: {
      type: String,
      default: "",
    },
    cssStyle: {
      type: String,
      default: "",
    },
    imgPublicId: String,
  },
  { timestamps: true }
);

const card = mongoose.model("card", CardSchema);
module.exports = card;
