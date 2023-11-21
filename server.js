const express = require("express");
const mongoose = require("mongoose");
const wardenRoutes = require("./routes/wardenRoutes");
const freeSessionsRoutes = require("./routes/freeSessionsRoutes");
const bookSlotRoutes = require("./routes/bookSlotRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/he", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json());

// wardenRoutes
app.use("/warden", wardenRoutes);
app.use("/warden", freeSessionsRoutes);
app.use("/warden", bookSlotRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
