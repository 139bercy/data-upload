const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("environnement", {
    name: {
      type: Sequelize.STRING,
      primaryKey: true
    }
  });
};