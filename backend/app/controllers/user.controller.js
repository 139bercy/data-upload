const db = require("../models");

const User = db.user;

function defineRoles(user) {
  return user.getRoles().then(roles => {
      return {
        ...user.dataValues,
        roles: roles.map(role => role.name)
      };
    }
  );
}

exports.findAllUsers = (req, res) => {
  User.findAll({ include: 'roles' })
    .then(users => {
      return Promise.all(
        users.map(user => {
          return defineRoles(user);
        })
      ).then(users => {
        res.json(users);
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving users"
      });
    });
};

exports.getUser = (req, res) => {
  User.findOne({ where: { username: req.params.id }, include: 'roles' })
    .then(user => {
      return defineRoles(user);
    })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving users"
      });
    });
};

exports.deleteUser = (req, res) => {
  console.log(req.username, req.params.id, req.param.username);
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
          err.message || "Some error occured while retrieving users"
      });
    });
};

exports.updateUser = (req, res) => {
  User.update(req.body, { where: { username: req.params.id } })
    .then(_ => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occured while retrieving users"
      });
    });
};

exports.createUser = (req, res) => {
  User.create(req.body)
    .then(user => user.setRoles(req.body.roles))
    .then(_ => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occured while retrieving users"
      });
    });
};
