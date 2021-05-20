const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    enable: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });
};
