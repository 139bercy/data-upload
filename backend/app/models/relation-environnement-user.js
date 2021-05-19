module.exports = (db) => {
  db.environnement.belongsToMany(db.user, {
    through: "user_environnements",
  });
  db.user.belongsToMany(db.environnement, {
    through: "user_environnements",
  });
};
