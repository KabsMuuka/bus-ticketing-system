const axios = require("axios");

const { v4: uuidv4 } = require("uuid");

// Collections Subscription Key:

let collections_subkey = "20db89d469b64c7da927ae05510628bd";

//Disbursement subscription key
let disbursements_subkey = "47dd0e0c73514eada4b50455c2cf922b";

//Production collections basic authorisation key(Leave it blank if in sandbox mode)
let basic_authorisation_collections = "";

//Production disbursement basic authorisation key(Leave it blank if in sandbox mode)
let basic_authorisation_disbursments = "";

//API user and Key(Note: Only use when in production mode)
let collections_apiuser = "";
let api_key_collections = "";

//API user and Key(Note: Only use when in production mode)
let disbursements_apiuser = "";
let api_key_disbursements = "";

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

//disbursements
if (environment_mode === "sandbox") {
  disbursements_apiuser = `47dd0e0c73514eada4b50455c2cf922b`;
}

const createApiUser = async () => {
  //================================================================================ Collections Code
  //============= Create API user
  const url = `${this.accurl}/v1_0/apiuser`;

  const payload = JSON.stringify({
    providerCallbackHost: "URL of host ie google.com",
  });

  const headers = {
    "X-Reference-Id": `${collections_apiuser}`,
    "Ocp-Apim-Subscription-Key": `${collections_subkey}`,
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
const apiKey = async () => {
  const url = `${accurl}/v1_0/apiuser/${collections_apiuser}/apikey`;

  const payload = {};
  const headers = {
    "Ocp-Apim-Subscription-Key": `${collections_subkey}`,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({}),
  });
  const res = await response.json();

  // Auto generate when in test mode
  if (environment_mode === "sandbox") {
    api_key_collections = res.apiKey;

    // console.log("apiKey", api_key_collections); //test

    setBasicAuthorizationCollections();
  }
  // return res.apiKey;
};

const setBasicAuthorizationCollections = () => {
  basic_authorisation_collections = Buffer.from(
    `${collections_apiuser}:${api_key_collections}`
  ).toString("base64");
};

// ============= Action Functions for collections
const momoToken = async () => {
  // console.log("api", this.api_key_collections); //testing
  const url = `${accurl}/collection/token/`;

  const headers = {
    "Ocp-Apim-Subscription-Key": collections_subkey,
    Authorization: `Basic ${basic_authorisation_collections}`,
  };

  // console.log("Requesting URL:", url);
  // console.log("Headers:", headers);

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
  createApiUser,
  apiKey,
  momoToken,
};
