// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin_user = sequelize.define("Admin_user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = Admin_user;
