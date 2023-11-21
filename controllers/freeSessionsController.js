const Warden = require("../models/warden");

const getFreeSessions = async (req, res) => {
  try {
    const allAvailableSlots = await Warden.find({
      availableSlots: { $exists: true, $not: { $size: 0 } },
    }).select("universityID availableSlots");

    res.json(allAvailableSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookedSlots = async (req, res) => {
  try {
    const warden = await Warden.findOne({
      universityID: req.user.universityID,
    });

    console.log(warden.bookedSlots);

    const allAvailableSlots = warden.bookedSlots.filter((slot) => {
      const slotTime = slot.time.split(":");
      console.log(slotTime, slot);
      return +slotTime[0] >= 10;
    });

    console.log(allAvailableSlots);

    res.json(allAvailableSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getFreeSessions, getBookedSlots };
