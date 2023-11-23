const mongoose = require("mongoose");

const availableSlotsSchema = new mongoose.Schema({
  wardenID: { type: mongoose.Schema.Types.ObjectId, ref: "Warden" },
  day: String,
  time: String,
});

const AvailableSlots = mongoose.model("AvailableSlots", availableSlotsSchema);

module.exports = AvailableSlots;
