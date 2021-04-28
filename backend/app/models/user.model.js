module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
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

    return User;
  };
