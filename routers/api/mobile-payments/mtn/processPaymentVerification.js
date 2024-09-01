const express = require("express");
const router = express.Router();
const auth = require("../../../../middleware/auth");

const { momoToken, apiKey } = require("./mtnAuthCollection");
const { momopay, verifymomo, momobalance } = require("./mtnCollectionPay");

const { sequelize } = require("../../../../models/payments");

// Mtn payment verification
router.get("/", auth, async (req, res) => {
  try {
    await apiKey(); //initlize mtn authenicaton

    const currentUserId = req.user.id;

    //get recent reference_Id and userId
    const [payments, metadata] = await sequelize.query(
      "SELECT reference_Id, userId FROM Payments ORDER BY createdAt DESC LIMIT 1"
    );

    // console.log(payments);
    payments.map(async (data) => {
      const reference_Id = data.reference_Id;
      // console.log("currentUserId", data.userId);

      const isMatched = currentUserId === data.userId;
      // console.log(isMatched);

      if (isMatched) {
        const verifyTransaction = await verifymomo(reference_Id);
        res.status(200).json(verifyTransaction);
        console.log(verifyTransaction);
      } else {
        res
          .status(401)
          .json(
            "Something went wrong, check your internet connection, 'Paymentverfication.js'"
          );
      }
    });
  } catch (error) {
    if (
      error.name === "FetchError" &&
      error.cause &&
      error.cause.code === "ETIMEDOUT"
    ) {
      console.error("Connect Timeout Error:", error);
      throw new Error(
        "Connection timed out while fetching the API key. Please try again later."
      );
    } else {
      console.error("An error occurred while fetching the API key:", error);
      throw new Error("Failed to fetch the API key.");
    }
  }
});

module.exports = router;
