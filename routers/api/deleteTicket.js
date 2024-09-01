const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const booked_tickets = require("../../models/bookedTickets");
const sequelize = require("../../config/db");

// Delete Bus (DELETE request)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await booked_tickets.findByPk(id); // Use Sequelize's findByPk method

    if (!ticket) {
      return res.status(404).json({ msg: "Ticket not found" });
    }

    //delete ticket using sequelize ORM-based (Object Relational Mapping) operations
    await booked_tickets.destroy({
      where: { id },
    });

    res.status(200).json("Ticket deleted Successfully ");
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
