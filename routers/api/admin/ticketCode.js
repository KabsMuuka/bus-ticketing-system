const express = require("express");
const router = express.Router();

const { sequelize } = require("../../../models/bookedTickets");

router.get("/", async (req, res) => {
  const [code, metadata] = await sequelize.query(
    "SELECT uniqueCode FROM BookedTickets"
  );
  try {
    // console.log(data.uniqueCode);
    res.status(200).json(code);
    console.log(code);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
