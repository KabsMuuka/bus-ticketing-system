const { v4: uuidv4 } = require("uuid"); //unique identifier
const Pin = require("./pin");

//this is an object and this is a method.
//to use this method, explicitly call this(),to execute its function()

class AirtelPay {
  //main
  // Constructor to initialize properties
  constructor() {
    // Set initial properties
    this.x_country = "ZM";
    this.x_currency = "ZMW";
    this.environment = "staging"; // Corrected from 'stagging' to 'staging'
    this.disbursement_pin = "0770";
    this.client_id = "8732f4bf-a027-4734-891d-bfcafab9b134";
    this.client_secret = "****************************";
    this.url_prefix = "https://openapiuat.airtel.africa";

    // Check environment and adjust url_prefix if needed
    if (this.environment === "production") {
      this.url_prefix = "https://openapi.airtel.africa";
      console.log(this.url_prefix);
    }
  }

  //TOKEN
  async token() {
    try {
      //using template literals to concaticate multiple expression
      const url = `${this.url_prefix}/auth/oauth2/token`;
      //payload
      const payload = JSON.stringify({
        client_id: `${this.client_id}`,
        client_secret: `${this.client_secret}`,
        grant_type: "client_credentials",
      });

      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: payload,
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  //Request to pay method
  //txn =  random id
  async pay(phone_number, amount, currency, country, txn) {
    try {
      const url = `${this.url_prefix}/merchant/v1/payments/`;
      //get number without leading 0
      const slicedphone = phone_number.slice("1");

      const payload = JSON.stringify({
        reference: "Reference for transactions",
        subscribe: {
          country: country,
          currency: currency,
          msisdn: slicedphone,
        },
        Transaction: {
          amount: amount,
          country: country,
          currency: currency,
          id: txn,
        },
      });

      //Get the token
      const tokenData = await this.token();
      const token = tokenData ? tokenData.access_token : "";

      const headers = {
        Country: country,
        Currency: currency,
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: payload,
      });
      const jsonData = await response.json();
      const context = { status: response.status_code, jsondata: jsonData };
      return context;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //Verify transaction
  async verfiy_transaction(txn) {
    const url = `${this.url_prefix}/standard/v1/payments${txn}`;

    const payload = JSON.stringify({});

    //Get the token
    const tokenData = await this.token();
    const token = tokenData ? tokenData.access_token : "";

    const headers = {
      x_country: this.x_country,
      x_currency: this.x_currency,
      Accept: "*/*",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      data: payload,
    });
    const jsonData = await response.json();
    const context = { status: response.text, jsonData: jsonData };
    return context;
  }

  //Airtel money balance
  async airtelBalance() {
    const url = `${this.url_prefix}/standard/v1/users/balance`;
    const payload = "";

    //Get the token
    const tokenData = await this.token();
    const token = tokenData ? tokenData.access_token : "";

    const headers = {
      "X-Country": `${this.x_country}`,
      "X-Currency": `${this.x_currency}`,
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      Cookie: "SERVERID=s116",
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      data: payload,
    });
    const jsonData = await response.json();
    return jsonData;
  }
  //transferMoneny
  async transfermoney(phone_number, amount) {
    //Get pin
    const pin = Pin.genPin(this.disbursement_pin).pin;
    //gen uuid code
    const uuid = uuidv4();
    // Remove the hyphens and extract the first 20 characters
    const uuidgen = uuid.replace(/-/g, "").slice(0, 20);
    const url = `${this.url_prefix}/standard/v1/disbursement/`;

    const payload = JSON.stringify({
      charges: {
        service: 1,
      },
      payee: {
        msisdn: phone_number,
      },
      reference: "Pay",
      pin: pin,
      transaction: {
        charge: 1,
        amount: amount,
        id: uuidgen,
      },
    });

    //Get the token
    const tokenData = await this.token();
    const token = tokenData ? tokenData.access_token : "";

    const headers = {
      "X-Country": `${this.x_country}`,
      "X-Currency": `${this.x_currency}`,
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Cookie: "SERVERID=s116",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      data: payload,
    });
    const data = { data: await response.json(), txn: uuidgen };
    return data;
  }
}
module.exports = AirtelPay;
