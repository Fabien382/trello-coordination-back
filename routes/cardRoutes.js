// routes/cardRoutes.js
const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middlewares/authMiddleware"); // Importez le middleware d'authentification

// Import the card model
const Card = require("../models/Card");

// Create a new card
router.post("/", async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();

    // Socket.io
    req.app.io.sockets.emit("cardCreated", card);

    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();

    // Socket.io
    req.app.io.sockets.emit("cardUpdated", cards);

    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one card
router.get("/:id", getCard, (req, res) => {
  res.json(res.card);
});

// Update one card
router.patch("/:id", getCard, async (req, res) => {
  if (req.body.title != null) {
    res.card.title = req.body.title;
  }
  if (req.body.desc != null) {
    res.card.desc = req.body.desc;
  }
  if (req.body.priority != null) {
    res.card.priority = req.body.priority;
  }
  if (req.body.state != null) {
    res.card.state = req.body.state;
  }
  try {
    const updatedCard = await res.card.save();
    res.json(updatedCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one card
router.delete("/:id", getCard, async (req, res) => {
  try {
    await res.card.remove();
    res.json({ message: "Deleted card" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function for gettig card object by ID
async function getCard(req, res, next) {
  try {
    card = await Card.findById(req.params.id);
    if (card == null) {
      return res.status(404).json({ message: "Cant find card" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.card = card;
  next();
}

module.exports = router;
