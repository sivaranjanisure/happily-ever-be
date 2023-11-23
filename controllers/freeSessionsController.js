const AvailableSlots = require("../models/availableSlots");
const BookedSlots = require("../models/bookedSlots");

const getFreeSessions = async (req, res) => {
  try {
    const allAvailableSlots = await AvailableSlots.find().populate(
      "wardenID",
      "universityID"
    );
    res.json(allAvailableSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookedSlots = async (req, res) => {
  try {
    const wardenID = req.user._id;
    const allBookedSlots = await BookedSlots.find({ wardenID }).populate(
      "bookingWardenID",
      "universityID"
    );
    res.json(allBookedSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { getFreeSessions, getBookedSlots };
