// Book Buses (PUT request)
const express = require("express");
const router = express.Router();
//auth
const auth = require("../../middleware/auth");

//database table
const secondBus = require("../../models/saveSeatSecondBus");

//start the save
router.get("/", auth, async (req, res) => {
  try {
    const seats = await secondBus.findAll();
    res.status(200).json(seats);
  } catch (err) {
    console.error("failed to fetch seats ", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
