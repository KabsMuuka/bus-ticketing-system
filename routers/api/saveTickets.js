// Book Buses (PUT request)
const express = require("express");
const router = express.Router();
//auth
const auth = require("../../middleware/auth");

//database table
const BookedTickets = require("../../models/bookedTickets");

//makes it possible to write Raw SQL
const { sequelize } = require("../../models/Users");

//start the save
router.post("/", auth, async (req, res) => {
  const {
    passengerName,
    from,
    to,
    reservedSeats,
    time,
    date,
    busPosition,
    uniqueCode,
  } = req.body;
  try {
    const [user, metadata] = await sequelize.query("SELECT * FROM Users");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.map(async (data) => {
      const userId = data.id; //get an id
      //then create a new ticket entry
      await BookedTickets.create({
        passengerName,
        from,
        to,
        reservedSeats,
        time,
        date,
        busPosition,
        uniqueCode,
        userId, //added as a foreign key Per Unique User
      });
    });
    res.status(200).json("Ticket Saved Successfully");
  } catch (err) {
    console.error("from SaveTicket", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
