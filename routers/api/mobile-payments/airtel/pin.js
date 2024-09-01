const forge = require("node-forge");

class Pin {
  static genPin(pin) {
    const pubkey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3wbrZUXAUefd63yyDeAr
rGkP/3SG9f1wpMkjrheQXbw9wfp4+3ZIZcqvrPXoF3L3aWz2BNbw42lm/QwkRhMn
/h9p9Lq1t95lvbL7+PWu/zqZ2/j8H4uRSm3oBlx45eYagh3CgkQ2qwz3jFLP9U7o
BT/p2W0I6NZ5yRxAPmhzze51VmiO+TEm4k3A5VqNuWU1NQTm58jbkWEE4IaW9lgu
EpoTHUl9slD4dwWxx5gHyq2oUrLpzzECWildirdZ8GmfFA29HQTT7WI1woIDJlZf
HE6C5O3Rpz3LdbuWAxW8llennBtFRIYmONOipLaPoH62ktKQsDyJN1qpZGx6uUas
5QIDAQAB
-----END PUBLIC KEY-----`;
    const msg = pin.toString();

    // Convert PEM-formatted public key to a forge public key object

    const keyPub = forge.pki.publicKeyFromPem(pubkey);

    //encrypt the message
    const cipherText = keyPub.encrypt(msg, `RSAES-PKCS1-V1_5`);

    //base64 encode the encryted message
    const emsg = forge.util.encode64(cipherText);
    const context = { pin: emsg };
    return context;
  }
}

module.exports = Pin;
