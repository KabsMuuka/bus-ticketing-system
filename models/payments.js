const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
//table
const User = require("./Users");
//
const payments = sequelize.define("Payments", {
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  userContact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payermessage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reference_Id: {
    type: DataTypes.STRING, // Using JSON to store an array of strings
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    model: User,
    key: "id",
  },
});
// Define associations
payments.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = payments;
