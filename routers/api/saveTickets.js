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
    currentUserId,
    from,
    to,
    price,
    time,
    date,
    busPosition,
    uniqueCode,
  } = req.body;

  console.log(req.body);

  console.log(typeof price);
  const currentUserID = Number(currentUserId);

  try {
    const [user, metadata] = await sequelize.query("SELECT * FROM Users");

    const currentUser = user.filter((user) => currentUserID === user.id);

    if (!currentUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    currentUser.map(async (user) => {
      await BookedTickets.create({
        passengerName,
        from,
        to,
        price,
        time,
        date,
        busPosition,
        uniqueCode,
        userId: user.id,
      });
    });

    res.status(200).json("Ticket Saved Successfully");
  } catch (err) {
    console.error("from SaveTicket", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
