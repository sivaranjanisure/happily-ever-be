const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const bookSlotController = require("../controllers/bookSlotController");

const router = express.Router();

router.post("/book-slot", authenticateToken, bookSlotController.bookSlot);

module.exports = router;
