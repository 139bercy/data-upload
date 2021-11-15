module.exports = (db) => {
    db.User.hasMany(db.APIToken);
};
