module.exports = (db) => {
    db.role.belongsToMany(db.user, {
        through: 'user_roles'
    });
    db.user.belongsToMany(db.role, {
        through: 'user_roles'
    });
};
