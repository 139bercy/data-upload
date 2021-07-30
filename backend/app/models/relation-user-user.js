module.exports = (db) => {
    db.User.belongsTo(db.User, {as: 'manager'});
};
