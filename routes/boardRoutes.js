// routes/boardRoutes.js
const express = require("express");
const router = express.Router();

// Import the Board model
const Board = require("../models/Board");

// Define your routes here (e.g., create, read, update, delete boards)

// Create a new board
router.post("/", async (req, res) => {
  try {
    const board = new Board(req.body);
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all boards
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one board
router.get("/:id", getBoard, (req, res) => {
  res.json(res.board);
});

// Update one board
router.patch("/:id", getBoard, async (req, res) => {
  if (req.body.title != null) {
    res.board.title = req.body.title;
  }
  if (req.body.desc != null) {
    res.board.desc = req.body.desc;
  }
  if (req.body.priority != null) {
    res.board.priority = req.body.priority;
  }
  if (req.body.state != null) {
    res.board.state = req.body.state;
  }
  try {
    const updatedBoard = await res.board.save();
    res.json(updatedBoard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one board
router.delete("/:id", getBoard, async (req, res) => {
  try {
    await res.board.remove();
    res.json({ message: "Deleted board" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function for gettig board object by ID
async function getBoard(req, res, next) {
  try {
    board = await Board.findById(req.params.id);
    if (board == null) {
      return res.status(404).json({ message: "Cant find board" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.board = board;
  next();
}
module.exports = router;
