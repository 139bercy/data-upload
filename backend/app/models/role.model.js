const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("role", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  };