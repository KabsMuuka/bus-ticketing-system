"use strict";
const express = require("express");
const app = express();
const sequelize = require("./config/db"); // Import your Sequelize instance
const path = require("path");
const { strict } = require("assert");

//AWS deployment
const buildPath = path.join(__dirname, "client/build");
console.log(buildPath);
console.log(__dirname);

app.use(express.static(buildPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html")),
    (err) => {
      if (err) {
        res.status(500).send(err);
      }
    };
});
//AWS
//new models needs to be imported inorder for it to show in db
// const User = require("./models/Users");
// const Bus = require("./models/Buses");
// const City = require("./models/popularCities");

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Api is running "));

app.use("/api/deleteAccount", require("./routers/api/delete_user_account")); //delete_user_account

app.use("/api/register", require("./routers/api/registerUser")); //register
app.use("/api/login", require("./routers/api/loginUser")); //login
app.use("/api/admin_login", require("./routers/api/loginAdmin")); //login admin
app.use("/api/cities", require("./routers/api/popularCities")); //popular cities
app.use("/api/users", require("./routers/api/users")); //registered users
app.use("/api/bookedTicket/save", require("./routers/api/saveTickets")); //save tickets
app.use("/api/search", require("./routers/api/searchBus")); //bus searching
app.use("/api/getTickets", require("./routers/api/getTickets")); //get Tickets
app.use("/api/deleteTicket", require("./routers/api/deleteTicket")); //deleteTicket

//save seats
app.use("/api/f1/seatNumber", require("./routers/api/storeFirstSeats")); //save seats 1
app.use("/api/s2/seatNumber", require("./routers/api/storeSecondSeats")); //save seats 2
app.use("/api/t3/seatNumber", require("./routers/api/storeThirdSeats")); //save seats 3

//get seats
app.use("/api/f1/storedSeats", require("./routers/api/getFirstSeats")); //save seats
app.use("/api/s2/storedSeats", require("./routers/api/getSecondSeats")); //save seats
app.use("/api/t3/storedSeats", require("./routers/api/getThirdSeats")); //save seats

//ADMIN
app.use("/api/admin", require("./routers/api/admin/ticketCode")); //request to pay
app.use("/api/getAllBusRoutes", require("./routers/api/availableBuses")); //get all routes to pay
app.use("/api/updateprice", require("./routers/api/updateprice")); //updateprice
app.use("/api/updatepriceAllbuses", require("./routers/api/updatepriceAllbus")); //updatepriceAllbuses

//

//mtn request_to_pay
app.use(
  "/api/requesttopay",
  require("./routers/api/mobile-payments/mtn/processPayment")
); //request to pay

//transaction_verification
app.use(
  "/api/verifyPayments",
  require("./routers/api/mobile-payments/mtn/processPaymentVerification")
); //request to pay

//end

app.use("/api/getUser", require("./routers/api/getUsers")); //experiment

app.use("/api/auth", require("./routers/api/auth"));
// Connect to the database
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Sync models (optional, usually done once during setup)
sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Error syncing database:", err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`server is running on port  ${PORT}`);
});
