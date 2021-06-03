const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("index", {
    name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    path: {
      type: Sequelize.STRING,
    }
  });
};