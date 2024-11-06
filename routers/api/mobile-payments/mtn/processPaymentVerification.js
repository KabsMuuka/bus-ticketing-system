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

    console.log("currentUserId", currentUserId);

    //get recent reference_Id and userId
    const [payments, metadata] = await sequelize.query(
      "SELECT * FROM Payments"
    );

    const currentUserData = payments.filter(
      (paydetail) => paydetail.userId === currentUserId
    );

    currentUserData.map(async (data, index) => {
      // Check if this is the last entry in the array
      if (index === currentUserData.length - 1) {
        // console.log("userId", data.userId);
        // console.log("reference_Id", data.reference_Id);
        const verifyTransaction = await verifymomo(data.reference_Id);
        res.status(200).json(verifyTransaction);
        console.log(verifyTransaction);
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
