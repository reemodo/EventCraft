const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    phoneNumber: String,
    name: String,
    location: String,
  },
  { timestamps: true }
);

const user = mongoose.model("user", UserSchema);
module.exports = user;
