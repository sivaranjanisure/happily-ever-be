const express = require("express");
const wardenController = require("../controllers/wardenController");

const router = express.Router();

router.post("/login", wardenController.login);
router.post("/signup", wardenController.signup);

module.exports = router;
