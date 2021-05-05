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
  userRoles = Array.from({length: req.body.usertype}, (x, i) => i+1);
  User.create(req.body, { where: { username: req.params.id } })
    .then(user => user.setRoles(userRoles))
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
