// app.js
const express = require("express");
const mongoose = require("mongoose");
const socketIo = require("socket.io");

const app = express();
const server = require("http").Server(app);
const io = socketIo(server); // Initialisation de Socket.IO
const PORT = process.env.PORT || 3004;
const cors = require("cors"); // Importez le middleware cors

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://fabien:TsNVvErQA4IAWsUR@trello-clone.v8sqfu0.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Middleware
app.use(express.json());

// Utilisez le middleware cors pour activer les requêtes cross-origin
app.use(cors());

// Routes
// app.use("/api/boards", require("./routes/boardRoutes"));
// app.use("/api/lists", require("./routes/listRoutes"));
app.use("/api/cards", require("./routes/cardRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// Attach Socket.IO to your application
app.io = io;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
