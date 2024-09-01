const { v4: uuidv4 } = require("uuid");

const username = "acd4d0fa543840908058b20e20ad56bb";
const password = `77686c9d-512c-4be6-9d61-7171eab90ae1`;
console.log(password);
const basicAuthString = `${username}:${password}`;
const encodedString = Buffer.from(basicAuthString, "utf-8").toString("base64");

console.log("Encoded String (JavaScript):", encodedString);
