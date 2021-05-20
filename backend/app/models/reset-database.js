const bcrypt = require("bcryptjs");

async function resetDatabase(User, Role, Environnement) {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

  Environnement.create({
    name: "plan-relance"
  });
  Environnement.create({
    name: "data-360"
  });
  if (typeof process.env['ADMIN_USERNAME'] == 'string' && typeof process.env['ADMIN_EMAIL'] == 'string' && typeof process.env['ADMIN_PASSWORD'] == 'string') {
    console.log('Création du compte admin depuis les informations d\'environnement fournies');
    User.create({
      id: 1,
      username: process.env['ADMIN_USERNAME'],
      email: process.env['ADMIN_EMAIL'],
      password: bcrypt.hashSync(process.env['ADMIN_PASSWORD'], 8),
    }).then(user => user.setRoles(["user", "moderator", "admin"]))
  } else {
    console.log('Vous devez spécifier en variable d\'environnement, les variables suivantes : ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_EMAIL');
  }
}

exports.reset = (sequelize) => {
  const Role = sequelize.model('role');
  const User = sequelize.model('user');
  const environnement = sequelize.model('environnement');

// force will drop the table if it already exists
  sequelize.sync({ force: true }).then(() => {
    console.log('Réinitialisation de la base de données');
    return resetDatabase(User, Role, environnement);
  });
};

exports.update = (sequelize) => {
  return sequelize.sync();
};
