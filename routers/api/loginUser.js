const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/Users");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Login user and get token
router.post(
  "/",
  [
    check("phoneNumber").notEmpty().withMessage("Phone number is required"),

    check("password", "please enter a password").exists(),
  ],
  async (req, res) => {
    console.log(req.body); // Log the found user to check

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phoneNumber, password } = req.body;

    try {
      const user = await User.findOne({ where: { phoneNumber } });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect credentials " }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect password" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 9999999 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
          // console.log(token);
          localStorage.setItem("token", token); //testing purpose only
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
