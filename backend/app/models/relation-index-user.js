module.exports = (db) => {
  db.index.belongsToMany(db.user, {
    through: "user_indexes",
  });
  db.user.belongsToMany(db.index, {
    through: "user_indexes",
  });
};
