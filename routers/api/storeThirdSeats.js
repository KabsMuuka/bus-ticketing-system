// Book Buses (PUT request)
const express = require("express");
const router = express.Router();
//auth
const auth = require("../../middleware/auth");

//database table
const saveSeatThirdBus = require("../../models/saveSeatThirdBus");

//makes it possible to write Raw SQL
const { sequelize } = require("../../models/Users");

//start the save
router.post("/:seatId", auth, async (req, res) => {
  const seatId = req.params.seatId;

  try {
    if (seatId) {
      await saveSeatThirdBus.create({
        seatNumber: seatId,
      });
    }

    res.status(200).json("seatNumber Saved Successfully");
  } catch (err) {
    console.error("from SaveTicket", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
