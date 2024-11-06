/*mtnCollectionPay contains the following functions 
1. momopay : a function resposible when a user requsttopay

2. verifymomo: a function that verifies user transaction if its  successful or failed

3. momobalance : a function that checks user balance in their mobile wallet
*/

const axios = require("axios");

const { momoToken, apiKey } = require("./mtnAuthCollection");

const { v4: uuidv4 } = require("uuid");

// Collections Subscription Key:

let collections_subkey = "20db89d469b64c7da927ae05510628bd";

//Production collections basic authorisation key(Leave it blank if in sandbox mode)
let basic_authorisation_collections = "";

//API user and Key(Note: Only use when in production mode)
let collections_apiuser = "";
let api_key_collections = "";

//Application mode
let environment_mode = "sandbox";

let accurl =
  environment_mode === "sandbox"
    ? "https://sandbox.momodeveloper.mtn.com"
    : "https://proxy.momoapi.MtnPay.com";

// Generate Basic authorization key when it test mode
if (environment_mode === "sandbox") {
  collections_apiuser = `66d19db5-aa9d-4ee7-b9b2-ea5436262d59`;
}

const momopay = async (
  amount,
  currency,
  txt_ref,
  phone_number,
  payermessage
) => {
  const momotoken = await momoToken();

  const uuidgen = uuidv4();
  const url = `${accurl}/collection/v1_0/requesttopay`;

  const payload = JSON.stringify({
    amount: amount,
    currency: currency,
    externalId: txt_ref,
    payer: {
      partyIdType: "MSISDN",
      partyId: phone_number,
    },
    payerMessage: payermessage,
    payeeNote: payermessage,
  });

  const headers = {
    "X-Reference-Id": uuidgen,
    "X-Target-Environment": environment_mode,
    "Ocp-Apim-Subscription-Key": collections_subkey,
    "Content-Type": "application/json",
    Authorization: `Bearer ${momotoken.access_token}`, //fixed
  };

  console.log("Requesting URL:", url);
  console.log("Headers:", headers);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: payload,
    });

    return { response: response.status, ref: uuidgen };
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
};

//verifymomo
const verifymomo = async (reference_Id) => {
  const momotoken = await momoToken();

  const url = `${accurl}/collection/v1_0/requesttopay/${reference_Id}`;
  const headers = {
    "X-Target-Environment": environment_mode,
    "Ocp-Apim-Subscription-Key": collections_subkey,
    Authorization: `Bearer ${momotoken.access_token}`,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const res = await response.json();
    return res;
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
};

//check balanace
const momobalance = async () => {
  const momotoken = await momoToken();

  const url = `${accurl}/collection/v1_0/account/balance`;
  const headers = {
    "X-Target-Environment": environment_mode,
    "Ocp-Apim-Subscription-Key": collections_subkey,
    Authorization: `Bearer ${momotoken.access_token}`,
  };
  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  const res = await response.json();
  return res;
};

module.exports = {
  momopay,
  verifymomo,
  momobalance,
};
