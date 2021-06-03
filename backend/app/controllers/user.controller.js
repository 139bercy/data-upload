const db = require("../models");

const User = db.user;
const Role = db.role;

const userDefaultAttributes = ['username', 'email', 'enable'];
const roleDefaultAttributes = ['name'];

async function mapRoles(user) {
  return {
    ...user.toJSON(),
    roles: (await user.getRoles()).map(role => role.name)
  }
}

async function setRoles(user, roles) {
  await user.setRoles(roles);
  return user;
}

async function setManager(user, manager) {
  console.log(user);
  await user.setManager(manager)
  return user;
}

exports.findAllUsers = (req, res) => {
  let request;
  if (req.roles.includes('admin')) {
    request = User.findAll({
      include: { model: Role, as: 'roles', attributes: roleDefaultAttributes },
      attributes: userDefaultAttributes
    });
  } else {
    request = User.findAll({
      where: { managerUsername: req.username },
      include: { model: Role, as: 'roles', attributes: roleDefaultAttributes },
      attributes: userDefaultAttributes
    });
  }
  request
    .then(users => {
      return Promise.all(
        users.map(user => {
          return mapRoles(user)
        })
      )
        .then(users => {
          res.json(users);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message:
              error.message || "Some error occured while retrieving users"
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Une erreur est apparu lors de la récupération de la liste des utilisateurs !"
      });
    });
};

exports.getUser = (req, res) => {
  let request = User.findOne({
    where: { username: req.params.id },
    include: { model: Role, as: 'roles', attributes: roleDefaultAttributes },
    attributes: userDefaultAttributes
  });
  if (!req.roles.includes('admin') && req.roles.includes('moderator') && req.username !== req.params.id) {
    request = User.findOne({
      where: { username: req.params.id, managerUsername: req.username },
      include: { model: Role, as: 'roles', attributes: roleDefaultAttributes },
      attributes: userDefaultAttributes
    });
  } else if (req.roles.includes('user') && req.username !== req.params.id) {
    console.error("En tant qu'utilisateur, il est impossible de récupérer les informations sur un autre utilisateur");
    res.status(403).json({
      message: "En tant qu'utilisateur, il est impossible de récupérer les informations sur un autre utilisateur"
    });
    return;
  }
  request
    .then(user => {
      sendUser(200, user, res);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message:
          err.message || "Une erreur est apparue lors de la récupération des informations d'un utilisateur !"
      });
    });
};

exports.deleteUser = (req, res) => {
  if (req.params.id === req.username) {
    res.status(400).send({
      message: "Vous ne pouvez pas vous supprimer vous même !"
    });
    return;
  }
  User.destroy({ where: { username: req.params.id } })
    .then(_ => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur inconnu est apparue lors de la suppression d'un utilisateur !"
      });
    });
};

exports.updateUser = (req, res) => {
  let request = User.update(req.body, { where: { username: req.params.id } });
  if (!req.roles.includes('admin') && req.roles.includes('moderator')) {
    request = User.update(req.body, { where: { username: req.params.id, managerUsername: req.username } });
  } else if (req.roles.includes('user') && req.username !== req.params.id) {
    console.error("En tant qu'utilisateur, il est impossible de modeifier les informations d'un autre utilisateur");
    res.status(403).json({
      message: "En tant qu'utilisateur, il est impossible de modeifier les informations d'un autre utilisateur"
    });
    return;
  }
  request
    .then(user => {
      if (req.username === req.params.id) {
        return User.findByPk(req.params.id)
      }
      return User.findByPk(req.params.id)
        .then(async user => {
          return setRoles(user, req.body.roles)
        });
    })
    .then(user => {
      sendUser(200, user, res);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message:
          err.message || "Une erreur est apparue lors de la mise à jour d'un utilisateur"
      });
    });
};

function handleManager(currentUsername, user) {
  return User.findByPk(currentUsername).then(currentUser => {
    return currentUser.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          return {
            ...user,
            manager: currentUser
          };
        }
      }
    });
  });
}

exports.createUser = (req, res) => {
  handleManager(req.username, req.body)
    .then(userData => {
      User.create(userData)
        .then(async user => {
          return await setRoles(user, req.body.roles);
        })
        .then(async user => {
          return await setManager(user, userData.manager);
        })
        .then(user => {
          console.log(user);
          sendUser(201, user, res);
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({
            message:
              err.message || "Une erreur inconnu est apparue lors de la création d'un utilisateur !"
          });
        });
    });
};


function sendUser(status, user, res) {
  mapRoles(user)
    .then(user => {
      res.status(status).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message:
          error.message || "Une erreur inconnue est apparue lors de la récupération des informations de l'utilisateur !"
      });
    });
}