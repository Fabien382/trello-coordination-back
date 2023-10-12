// app.js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3004;

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

// Routes
// app.use("/api/boards", require("./routes/boardRoutes"));
// app.use("/api/lists", require("./routes/listRoutes"));
app.use("/api/cards", require("./routes/cardRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
