const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const PopularCities = sequelize.define(
  "popularCities",
  {
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
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = PopularCities;
