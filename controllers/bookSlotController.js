const Warden = require("../models/warden");

const bookSlot = async (req, res) => {
  try {
    const { day, time, targetWardenID } = req.body;
    const bookingWardenID = req.user.universityID;

    const bookingWarden = await Warden.findOne({
      universityID: bookingWardenID,
    });

    if (!bookingWarden) {
      return res.status(404).json({ message: "Booking warden not found" });
    }
    console.log(bookingWarden.availableSlots);

    const targetWarden = await Warden.findOne({ universityID: targetWardenID });

    if (!targetWarden) {
      return res.status(404).json({ message: "Target warden not found" });
    }

    const availableSlotIndex = targetWarden.availableSlots.findIndex(
      (slot) => slot.day === day && slot.time === time
    );

    if (availableSlotIndex === -1) {
      return res.status(400).json({ message: "Slot not available" });
    }

    const bookedSlot = targetWarden.availableSlots.splice(
      availableSlotIndex,
      1
    )[0];
    targetWarden.bookedSlots.push({
      wardenName: bookingWarden.universityID,
      day: bookedSlot.day,
      time: bookedSlot.time,
    });

    await bookingWarden.save();
    await targetWarden.save();

    res.json({ message: "Slot booked successfully", bookedSlot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { bookSlot };
