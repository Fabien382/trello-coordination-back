// models/Board.js
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: String,
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "todo",
  },
  state: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    default: "todo",
  },
});

module.exports = mongoose.model("Card", cardSchema);
