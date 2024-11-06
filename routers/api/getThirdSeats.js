// Book Buses (PUT request)
const express = require("express");
const router = express.Router();
//auth
const auth = require("../../middleware/auth");

//database table
const thirdBus = require("../../models/saveSeatThirdBus");

//start the save
router.get("/", auth, async (req, res) => {
  try {
    const seats = await thirdBus.findAll();
    res.status(200).json(seats);
  } catch (err) {
    console.error("failed to fetch seats ", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
