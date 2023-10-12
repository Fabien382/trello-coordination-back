// models/Board.js
const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: String,
  priority: { type: Number, default: 0 },
  state: { type: String, enum: ["todo", "done"], default: "active" },
  // Add other fields as needed
});

module.exports = mongoose.model("Board", boardSchema);
