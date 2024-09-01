const express = require("express");
const router = express.Router();
const { sequelize } = require("../../models/Users"); // Import the Sequelize instance

// Get all users
router.get("/", async (req, res) => {
  try {
    //i want more control use of Raw SQL does the job
    const [results, metadata] = await sequelize.query("SELECT * FROM Users");

    results.map((data) => {
      console.log(data.name);
    });
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
