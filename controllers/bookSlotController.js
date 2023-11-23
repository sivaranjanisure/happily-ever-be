const AvailableSlots = require("../models/availableSlots");
const BookedSlots = require("../models/bookedSlots");

const bookSlot = async (req, res) => {
  try {
    const { day, time, targetWardenID } = req.body;
    const bookingWardenID = req.user._id;

    const targetWarden = await AvailableSlots.findOne({
      wardenID: targetWardenID,
      day,
      time,
    });

    if (!targetWarden) {
      return res.status(400).json({ message: "Slot not available" });
    }

    const newBookedSlot = new BookedSlots({
      wardenID: targetWarden.wardenID,
      bookingWardenID,
      day,
      time,
    });

    await newBookedSlot.save();
    await targetWarden.remove();

    res.json({
      message: "Slot booked successfully",
      bookedSlot: newBookedSlot,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { bookSlot };
