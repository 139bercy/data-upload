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
    name: "plan-relance",
    path: "plan-relance"
  });
  Environnement.create({
    name: "decp",
    path: "decp"
  });
  Environnement.create({
    name: "data-360_DGF_Lingua",
    path: "data-360/DGF/Lingua"
  });
  Environnement.create({
    name: "data-360_DGF_TAXI",
    path: "data-360/DGF/TAXI"
  });
  Environnement.create({
    name: "data-360_DGF_RPZ",
    path: "data-360/DGF/RPZ"
  });
  Environnement.create({
    name: "data-360_DGF_MISSION",
    path: "data-360/DGF/MISSION"
  });
  Environnement.create({
    name: "data-360_DGF_FB",
    path: "data-360/DGF/FB"
  });
  Environnement.create({
    name: "data-360_DGF_REPRO",
    path: "data-360/DGF/REPRO"
  });
  Environnement.create({
    name: "data-360_DGF_DOC",
    path: "data-360/DGF/DOC"
  });
  Environnement.create({
    name: "data-360_DGF_AFF",
    path: "data-360/DGF/AFF"
  });
  Environnement.create({
    name: "data-360_DGF_MIS2",
    path: "data-360/DGF/MIS2"
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
