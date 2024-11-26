const express = require("express");
const router = express.Router();

const popularCities = require("../../models/popularCities");

router.post("/", async (req, res) => {
  const { price, id } = req.body;

  await popularCities.sequelize
    .query(`UPDATE popularCities SET price = ${price} WHERE id = ${id}`)
    .then(() => console.log("successfully updated the price"))
    .catch((error) => console.log("failed to update the price", error));
});

module.exports = router;
