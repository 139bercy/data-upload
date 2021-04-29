module.exports = (sequelize, Sequelize) => {
  return sequelize.define("roles", {
      name: {
        type: Sequelize.STRING,
        primaryKey: true
      }
    });
  };