module.exports = (db) => {
    db.User.belongsToMany(db.Role, {
        through: 'user_roles', as: 'roles'
    });
};
