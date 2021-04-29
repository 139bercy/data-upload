 module.exports = (db) => {
   /* db.environnement.belongsToMany(db.user, {
        through: "user_env",
        foreignKey: "userId",
        otherKey: "envId"
    });
    */
    db.user.hasMany(db.environnement);
};
