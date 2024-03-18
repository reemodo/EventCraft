const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: String,
    description: String,
    location: String,
    startDate: Date,
    endDate: Date,
    duration: Number,
    phone: String,
    cardID: { type: mongoose.Schema.Types.ObjectId, ref: "card" },
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    category: String,
    isPublic: Boolean,
  },
  { timestamps: true }
);

const event = mongoose.model("event", EventSchema);
module.exports = event;
