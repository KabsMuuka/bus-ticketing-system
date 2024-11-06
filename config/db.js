const { Sequelize } = require("sequelize");

// Database connection configuration
const sequelize = new Sequelize("systemTicket", "root", "code", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Set to console.log if you want to see SQL queries
});

module.exports = sequelize;
