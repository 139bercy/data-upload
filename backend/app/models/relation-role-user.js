module.exports = (sequelize, Sequelize) => {
    sequelize.db.role.belongsToMany(sequelize.db.user, {
        through: "user_roles",
        foreignKey: "roleId",
        otherKey: "userId"
    });
    sequelize.db.user.belongsToMany(sequelize.db.role, {
        through: "user_roles",
        foreignKey: "userId",
        otherKey: "roleId"
    });
};
