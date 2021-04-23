module.exports = (sequelize, Sequelize) => {
    const Environnement = sequelize.define("environnement", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });

    return Environnement;
  };