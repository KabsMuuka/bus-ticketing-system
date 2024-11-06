const axios = require("axios");

const { v4: uuidv4 } = require("uuid");

//Disbursement subscription key
let disbursements_subkey = "47dd0e0c73514eada4b50455c2cf922b";

//Production disbursement basic authorisation key(Leave it blank if in sandbox mode)
let basic_authorisation_disbursments = "";

//API user and Key(Note: Only use when in production mode)
let disbursements_apiuser = "";
let api_key_disbursements = "";

//Application mode
let environment_mode = "sandbox";

let accurl =
  environment_mode === "sandbox"
    ? "https://sandbox.momodeveloper.mtn.com"
    : "https://proxy.momoapi.MtnPay.com";

//disbursements
if (environment_mode === "sandbox") {
  disbursements_apiuser = `66d19db5-aa9d-4ee7-b9b2-ea5436262d59`;
}

const createApiUser_disburseement = async () => {
  //================================================================================ Collections Code
  //============= Create API user
  const url = `${accurl}/v1_0/apiuser`;

  const payload = JSON.stringify({
    providerCallbackHost: "URL of host ie google.com",
  });

  const headers = {
    "X-Reference-Id": `${disbursements_apiuser}`,
    "Ocp-Apim-Subscription-Key": `${disbursements_subkey}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    data: payload,
  });

  const res = await response.json();
};

// ============= Create API key
const apiKey_disbursement = async () => {
  const url = `${accurl}/v1_0/apiuser/${disbursements_apiuser}/apikey`;

  const payload = {};
  const headers = {
    "Ocp-Apim-Subscription-Key": `${disbursements_subkey}`,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({}),
  });
  const res = await response.json();

  // Auto generate when in test mode
  if (environment_mode === "sandbox") {
    api_key_disbursements = res.apiKey; //from mtn

    // console.log("apiKey", api_key_disbursements); //test

    setBasicAuthorizationCollections();
  }
  //   return res.apiKey;
};

const setBasicAuthorizationCollections = () => {
  basic_authorisation_disbursments = Buffer.from(
    `${disbursements_apiuser}:${api_key_disbursements}`
  ).toString("base64");
};

// ============= Action Functions for collections
const momoToken_disbursement = async () => {
  // console.log("api", this.api_key_collections); //testing
  const url = `${accurl}/disbursement/token/`;

  const headers = {
    "Ocp-Apim-Subscription-Key": disbursements_subkey,
    Authorization: `Basic ${basic_authorisation_disbursments}`,
  };

  console.log("Requesting URL:", url);
  console.log("Headers:", headers);

  // return;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
    });

    const authorizationToken = await response.json();
    return authorizationToken;
  } catch (error) {
    console.error("Error message:", error.message);
  }
};

module.exports = {
  createApiUser_disburseement,
  momoToken_disbursement,
  apiKey_disbursement,
};
