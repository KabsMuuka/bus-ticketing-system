// const { momoToken, apiKey } = require("./mtnAuthCollection");
// const { momopay, verifymomo, momobalance } = require("./mtnCollectionPay");

//disbursement
const { momoToken, apiKey } = require("./mtnAuthCollection");

(async () => {
  try {
    await apiKey();
    //apikey
    // console.log("apikey", apikey);

    // acess_token;
    const token = await momoToken();
    console.log(token);

    //client requesting to pay
    // const pay = await momopay(40, "EUR", "1234text", "0762766360", "testing");
    // console.log(pay);

    //verifying transaction
    // const verify = await verifymomo("937830a5-a83d-48e2-88fd-5aa9fce9a77d");
    // console.log(verify);

    // const check = await momobalance();
    // console.log(check);
  } catch (error) {
    console.error("Error:", error);
  }
})();
