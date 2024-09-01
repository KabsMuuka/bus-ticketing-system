const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const User = require("../../models/Users");
const sequelize = require("../../config/db");

// Delete Bus (DELETE request)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id); // Use Sequelize's findByPk method

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    //delete USER using sequelize ORM-based (Object Relational Mapping) operations
    await user.destroy({
      where: { id },
    });

    res.status(200).json("User deleted Successfully ");
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
