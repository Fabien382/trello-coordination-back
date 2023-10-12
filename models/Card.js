// models/Board.js
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: String,
  priority: { type: Number, default: 0 },
  state: { type: String, enum: ["todo", "done"], default: "active" },
});

module.exports = mongoose.model("Card", cardSchema);
