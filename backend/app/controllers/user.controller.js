exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
  
const db = require("../models");

const User = db.user;

exports.findAllUsers = (req, res) => {
  User.findAll()
    .then(data => {
      console.log(data);
      res.send(data);
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
  User.destroy({where: req.params.id})
    .then(data => {
      res.status(204).send();})
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving users"
      });
    });
};

exports.updateUser = (req, res) => {
  User.update(req.body, {where: req.params.id})
    .then(_ => {
      res.status(204).send();})
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving users"
      });
    });
};
