// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin_user = sequelize.define(
  "admin",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Admin_user;
