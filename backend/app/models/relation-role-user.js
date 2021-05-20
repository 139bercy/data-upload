module.exports = (db) => {
    db.user.belongsToMany(db.role, {
        through: 'user_roles', as: 'roles'
    });
};
