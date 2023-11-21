const Warden = require("../models/warden");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signup = async (req, res) => {
  const { universityID } = req.body;

  try {
    const existingWarden = await Warden.findOne({ universityID });

    if (existingWarden) {
      return res
        .status(400)
        .json({ message: "Warden already exists with this ID" });
    }

    const newWarden = new Warden(req.body);
    await newWarden.save();

    res.status(201).json({ message: "Warden signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { universityID, password } = req.body;

  try {
    const warden = await Warden.findOne({ universityID });

    if (!warden || warden.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ universityID }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, signup };
