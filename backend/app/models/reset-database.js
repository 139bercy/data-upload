async function resetDatabase(User, Role, Index) {
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

  Index.create({
    name: "plan-relance",
    path: "plan-relance"
  });
  Index.create({
    name: "decp",
    path: "decp"
  });
  Index.create({
    name: "data-360_DGF_Lingua",
    path: "data-360/DGF/Lingua"
  });
  Index.create({
    name: "data-360_DGF_TAXI",
    path: "data-360/DGF/TAXI"
  });
  Index.create({
    name: "data-360_DGF_RPZ",
    path: "data-360/DGF/RPZ"
  });
  Index.create({
    name: "data-360_DGF_MISSION",
    path: "data-360/DGF/MISSION"
  });
  Index.create({
    name: "data-360_DGF_FB",
    path: "data-360/DGF/FB"
  });
  Index.create({
    name: "data-360_DGF_REPRO",
    path: "data-360/DGF/REPRO"
  });
  Index.create({
    name: "data-360_DGF_DOC",
    path: "data-360/DGF/DOC"
  });
  Index.create({
    name: "data-360_DGF_AFF",
    path: "data-360/DGF/AFF"
  });
  Index.create({
    name: "data-360_DGF_MIS2",
    path: "data-360/DGF/MIS2"
  });
  if (typeof process.env['ADMIN_USERNAME'] == 'string' && typeof process.env['ADMIN_EMAIL'] == 'string' && typeof process.env['ADMIN_PASSWORD'] == 'string') {
    console.log('Création du compte admin depuis les variables d\'environnement fournies');
    User.create({
      id: 1,
      username: process.env['ADMIN_USERNAME'],
      email: process.env['ADMIN_EMAIL'],
      password: process.env['ADMIN_PASSWORD'],
    }).then(user => user.setRoles(["user", "moderator", "admin"]))
  } else {
    console.log('Vous devez spécifier en variable d\'environnement, les variables suivantes : ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_EMAIL');
  }
}

exports.reset = (sequelize) => {
  const Role = sequelize.model('role');
  const User = sequelize.model('user');
  const Index = sequelize.model('index');

// force will drop the table if it already exists
  sequelize.sync({ force: true }).then(() => {
    console.log('Réinitialisation de la base de données');
    return resetDatabase(User, Role, Index);
  });
};

exports.update = (sequelize) => {
  return sequelize.sync();
};
