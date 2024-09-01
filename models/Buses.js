const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Bus = sequelize.define("Bus", {
  busPosition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stops: {
    type: DataTypes.JSON, // Using JSON to store an array of strings
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
});
module.exports = Bus;
