const airtelPay = require("./airtel");
const here = require("./2");

// Create an instance of AirtelPay
const airtelInstance = new airtelPay();

(async function X() {
  const Pay = await airtelInstance.pay(
    "0770309802",
    "1",
    "ZMW",
    "Zambia",
    "random-02345678"
  );
  // console.log(Pay);
})();

