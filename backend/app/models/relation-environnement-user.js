module.exports = (db) => {
  db.environnement.belongsToMany(db.user, {
    through: "user_environnements",
  });
  db.user.belongsToMany(db.role, {
    through: "user_environnements",
  });
};
