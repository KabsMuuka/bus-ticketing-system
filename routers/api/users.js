const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//database table
const User = require("../../models/Users");

// Get current user profile
router.get("/", auth, async (req, res) => {
  try {
    //gets the user users specific information
    const user = await User.findByPk(req.user.id); // Use Sequelize's findByPk method

    if (!user) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile/experience/:bus_id
// @desc     Delete Buses
// @access   Private

module.exports = router;
