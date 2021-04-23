 module.exports = (db) => {
    db.environnement.belongsToMany(db.user, {
        through: "user_env",
        foreignKey: "envId",
        otherKey: "userId"
    });
    db.user.belongsToMany(db.role, {
        through: "user_env",
        foreignKey: "userId",
        otherKey: "envId"
    });
};
