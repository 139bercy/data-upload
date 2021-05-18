const db = require("../models");

const Env = db.environnement;

exports.findAllEnvironnement = (req, res) => {
  Env.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving environnement"
      });
    });
};

exports.deleteEnvironnement = (req, res) => {
  console.log("rftgyhujiokpkjihuy");
  Env.destroy({ where: { name: req.params.id } })
    .then(_ => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while deleting env"
      });
    });
};

exports.addEnvironnement = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "L'environnement doit avoir un nom !"
    });
    return ;
  }
  Env.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while deleting env"
      });
    });
};
