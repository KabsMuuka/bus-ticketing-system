const express = require("express");
const router = express.Router();

const popularCities = require("../../models/popularCities");

router.get("/", async (req, res) => {
  try {
    const popular = await popularCities.findAll(); //get all cities

    if (!popular) {
      return res.status(400).json({ msg: "City name not available" });
    }

    res.json(popular);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
