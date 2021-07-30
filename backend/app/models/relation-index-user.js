module.exports = (db) => {
  db.Index.belongsToMany(db.User, {
    through: "user_indexes",
  });
  db.User.belongsToMany(db.Index, {
    through: "user_indexes", as: 'indexes'
  });
};
