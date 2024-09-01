const express = require("express");
const router = express.Router();
// const auth = require("../../middleware/auth");

const { momoToken, apiKey } = require("./mtnAuthCollection");
const { momopay, verifymomo, momobalance } = require("./mtnCollectionPay");

//database table
const Payments = require("../../../../models/payments");
const { sequelize } = require("../../../../models/Users");

// Mtn process payment
router.post("/", async (req, res) => {
  const { userContact, amount } = req.body;

  // const pay = await momopay(40, "EUR", "1234text", "0762766360", "testing");

  //created infor
  const currency = "EUR";
  const txt_ref = "12345Ref";
  const payermessage = "testing_mode";

  try {
    if (userContact === "" && amount === "") {
      return;
    } else {
      await apiKey(); //initlize mtn authenicaton

      const requestPay = await momopay(
        amount,
        currency,
        txt_ref,
        userContact,
        payermessage
      );

      if (requestPay.response === 200 || requestPay.response === 202) {
        const reference_Id = requestPay.ref;

        const [user, metadata] = await sequelize.query("SELECT * FROM Users");
        if (!user) {
          return res.status(404).json({ msg: "User not found" });
        }
        user.map(async (data) => {
          await Payments.create({
            amount,
            currency,
            userContact,
            payermessage,
            reference_Id,
            userId: data.id,
          });
        });
      }
      res.status(200).json("payment successful");
    }
  } catch (error) {
    console.log("Server Error ", error);
  }
});
module.exports = router;
