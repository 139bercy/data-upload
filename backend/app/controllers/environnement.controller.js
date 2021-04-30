const db = require("../models");

const Env = db.environnement;

exports.findAllEnvironnement = (req, res) => {
  Env.findAll()
    .then(data => {
      res.send(data);
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
  User.destroy({ where: { name: req.params.id } })
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
