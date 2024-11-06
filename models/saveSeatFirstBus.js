// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./Users");

const saveSeat = sequelize.define("firstBusSeats", {
  seatNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = saveSeat;
