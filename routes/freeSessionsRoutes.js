const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const freeSessionsController = require("../controllers/freeSessionsController");

const router = express.Router();

router.get(
  "/free-sessions",
  authenticateToken,
  freeSessionsController.getFreeSessions
);

router.get(
  "/booked-slot",
  authenticateToken,
  freeSessionsController.getBookedSlots
);

module.exports = router;
