module.exports = (db) => {
    db.role.belongsToMany(db.user, {
        through: "user_roles",
        foreignKey: "roleId",
        otherKey: "userName"
    });
    db.user.belongsToMany(db.role, {
        through: "user_roles",
        foreignKey: "userName",
        otherKey: "roleId"
    });
};
