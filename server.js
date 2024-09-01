const express = require("express");

const sequelize = require("./config/db"); // Import your Sequelize instance
const path = require("path");

//new models needs to be imported inorder for it to show in db
// const User = require("./models/Users");
// const Bus = require("./models/Buses");
// const City = require("./models/popularCities");

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Api is running "));

app.use("/api/deleteAccount", require("./routers/api/delete_user_account")); //delete_user_account

app.use("/api/register", require("./routers/api/registerUser")); //register
app.use("/api/login", require("./routers/api/loginUser")); //login
app.use("/api/cities", require("./routers/api/popularCities")); //popular cities
app.use("/api/users", require("./routers/api/users")); //registered users
app.use("/api/bookedTicket/save", require("./routers/api/saveTickets")); //save tickets
app.use("/api/search", require("./routers/api/searchBus")); //bus searching
app.use("/api/getTickets", require("./routers/api/getTickets")); //get Tickets
app.use("/api/deleteTicket", require("./routers/api/deleteTicket")); //deleteTicket

//admin
app.use("/api/admin", require("./routers/api/admin/ticketCode")); //request to pay

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

app.listen(PORT, () => console.log(`server is running on port  ${PORT}`));
