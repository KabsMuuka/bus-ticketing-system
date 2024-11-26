const express = require("express");
const router = express.Router();
const Buses = require("../../models/popularCities");

router.get("/", async (req, res) => {
  await Buses.sequelize
    .query("SELECT * FROM Buses")
    .then((allRoutes) => {
      res.status(200).json(allRoutes);
    })
    .catch((error) => {
      res.status(500).json("failed to retrieve bus routes", error);
    });
});

module.exports = router;
