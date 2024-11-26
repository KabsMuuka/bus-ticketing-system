const express = require("express");
const router = express.Router();

const Buses = require("../../models/Buses");

router.post("/", async (req, res) => {
  const { price, id } = req.body;

  // console.log(price, id);

  await Buses.sequelize
    .query(`UPDATE Buses SET price = ${price} WHERE id = ${id}`)
    .then(() => console.log("successfully updated the price"))
    .catch((error) => console.log("failed to update the price", error));
});

module.exports = router;
