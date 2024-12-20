const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../../models/Users");

// Register user

router.post(
  "/",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("phoneNumber").notEmpty().withMessage("Phone number is required"), // Remove isMobilePhone temporarily
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],

  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    // Check errors array
    console.log("Validation Errors:", errors.array());

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phoneNumber, password } = req.body;

    // console.log("from body", req.body);

    try {
      let user = await User.findOne({ where: { phoneNumber } }); // Use Sequelize's findOne method

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = await User.create({
        name,
        phoneNumber,
        password: await bcrypt.hash(password, 10),
      });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
