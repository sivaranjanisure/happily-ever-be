const mongoose = require("mongoose");

const wardenSchema = new mongoose.Schema({
  universityID: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const Warden = mongoose.model("Warden", wardenSchema);

module.exports = Warden;
