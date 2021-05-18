const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("role", {
      name: {
        type: Sequelize.STRING,
        primaryKey: true
      }
    });
  };