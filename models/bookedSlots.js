const mongoose = require("mongoose");

const bookedSlotsSchema = new mongoose.Schema({
  wardenID: { type: mongoose.Schema.Types.ObjectId, ref: "Warden" },
  bookingWardenID: { type: mongoose.Schema.Types.ObjectId, ref: "Warden" },
  day: String,
  time: String,
});

const BookedSlots = mongoose.model("BookedSlots", bookedSlotsSchema);

module.exports = BookedSlots;
