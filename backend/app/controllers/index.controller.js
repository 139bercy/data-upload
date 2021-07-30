const { Index } = require("../models");

exports.findAll = async (_, res) => {
  let indexes = await Index.findAll();
  res.json(indexes);
};

exports.delete = async (req, res) => {
  await Index.destroy({ where: { name: req.params.id } })
  res.status(204).send();
};

exports.add = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "L'index doit avoir un nom !"
    });
    return ;
  }
  let index = await Index.create(req.body);
  res.json(index);
};
