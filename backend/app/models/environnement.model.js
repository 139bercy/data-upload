module.exports = (sequelize, Sequelize) => {
  return sequelize.define("environnement", {
    name: {
      type: Sequelize.STRING,
      primaryKey: true
    }
  });
};