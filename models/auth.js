const mongoose = require("mongoose");
const Todo = require("./Todo");

const auth = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min:6,
      max:255
    },
    email: {
        type: String,
        required: true,
        max:255,
        min:6
      },
    password: {
    type: String,
    required: true,
    max:1024,
    min:6
    },
    date: {
        type: Date,
        default:Date.now
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("auth", auth);