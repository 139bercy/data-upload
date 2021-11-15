const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  let APIToken = sequelize.define("api_token", {
    token: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    description: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    enable: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return APIToken;
};
