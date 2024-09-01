const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Cities = sequelize.define("Cities", {
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  busPosition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stops: {
    type: DataTypes.JSON, // Using JSON to store an array of strings
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Cities;
