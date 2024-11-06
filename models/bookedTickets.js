// models/BookedTickets.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("../models/Users"); // Ensure User model is correctly imported

const BookedTickets = sequelize.define("BookedTickets", {
  passengerName: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reservedSeats: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedBusId: {
    type: DataTypes.STRING,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  busPosition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uniqueCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    // Foreign key for the relationship
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: true,
    onDelete: "SET NULL", // Apply ON DELETE SET NULL
  },
});

// Define associations
BookedTickets.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "SET NULL", // Ensure ON DELETE SET NULL is enforced
});

module.exports = BookedTickets;
