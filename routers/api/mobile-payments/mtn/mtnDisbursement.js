const {
  momoToken_disbursement,
  apiKey_disbursement,
} = require("./mtnAuthDisbursement");

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

//Check Disubursement balance
const momobalancedisbursement = async () => {
  const momotoken = await momoToken_disbursement();
  const url = `${accurl}/disbursement/v1_0/account/balance`;

  const payload = {};

  const headers = {
    "X-Target-Environment": environment_mode,
    "Ocp-Apim-Subscription-Key": disbursements_subkey,
    Authorization: `Bearer ${momotoken.access_token}`,
  };

  //   console.log("Requesting URL:", url);
  //   console.log("Headers:", headers);

  // return;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error message:", error.message);
  }
};

//Withdraw money Disbursement
const withdrawmtnmomo = async (
  amount,
  currency,
  txt_ref,
  phone_number,
  payermessage
) => {
  const momotoken = await momoToken_disbursement();
  const url = `${accurl}/disbursement/v1_0/transfer`;

  const payload = JSON.stringify({
    amount: amount,
    currency: currency,
    externalId: txt_ref,
    payee: {
      partyIdType: "MSISDN",
      partyId: phone_number,
    },
    payerMessage: payermessage,
    payeeNote: payermessage,
  });

  const headers = {
    "X-Target-Environment": environment_mode,
    "Ocp-Apim-Subscription-Key": disbursements_subkey,
    Authorization: `Bearer ${momotoken.access_token}`,
    "Content-Type": "application/json",
  };

  //   console.log("Requesting URL:", url);
  //   console.log("Headers:", headers);

  // return;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: payload,
    });
    return { response: response.status_code, ref: uuidgen };
  } catch (error) {
    console.error("Error message:", error.message);
  }
};

//   Check transfer status disbursment

const checkwithdrawstatus = async (reference_Id) => {
  const momotoken = momoToken_disbursement();
  const uuidgen = uuidv4();
  const url = `${accurl}/disbursement/v1_0/transfer/${reference_Id}`;

  const payload = {};

  const headers = {
    "X-Reference-Id": uuidgen,
    "X-Target-Environment": environment_mode,
    "Ocp-Apim-Subscription-Key": disbursements_subkey,
    Authorization: `Bearer ${momotoken.access_token}`,
  };

  //   console.log("Requesting URL:", url);
  //   console.log("Headers:", headers);

  // return;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error message:", error.message);
  }
};

module.exports = {
  momobalancedisbursement,
  withdrawmtnmomo,
  checkwithdrawstatus,
};
