const db = require("../models");

const Env = db.environnement;

exports.findAllEnvironnement = (req, res) => {
  Env.findAll()
    .then(data => {
      console.log(data);
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
