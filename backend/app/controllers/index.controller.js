const db = require("../models");

const Index = db.index;

exports.findAll = (req, res) => {
  console.log("index findAll");
  Index.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Un erreur inconnu est apparue lors de la récupération de la liste des indexes !"
      });
    });
};

exports.delete = (req, res) => {
  Index.destroy({ where: { name: req.params.id } })
    .then(_ => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur inconnue est apparue lors de la suppression d'un index !"
      });
    });
};

exports.add = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "L'index doit avoir un nom !"
    });
    return ;
  }
  Index.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur inconnu est apparue lors de l'ajout d'un index !"
      });
    });
};
