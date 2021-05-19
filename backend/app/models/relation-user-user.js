module.exports = (db) => {
    db.user.belongsTo(db.user, {as: 'manager'});
};
