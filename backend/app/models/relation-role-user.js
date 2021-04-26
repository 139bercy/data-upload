module.exports = (db) => {
    db.role.belongsToMany(db.user, {
        through: "user_roles",
        foreignKey: "roleId",
        otherKey: "userId"
    });
    db.user.belongsToMany(db.role, {
        through: "user_roles",
        foreignKey: "userId",
        otherKey: "roleId"
    });
};
