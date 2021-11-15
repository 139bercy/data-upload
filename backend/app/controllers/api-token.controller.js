const UniqueConstraintError = require("sequelize").UniqueConstraintError;
const { APIToken } = require("../models");

exports.findAll = async (req, res) => {
  const tokens = await await APIToken.findAll({where: {userUsername: req.user.username}}) ?? [];
  return res.json(tokens)
}

exports.delete = async (req, res) => {
  await APIToken.destroy({ where: { token: req.params.id } })
  res.status(204).send();
};

exports.create = async (req, res) => {
  console.log(req.body)

  if (!req.body.description) {
    res.status(400).send({
      message: "Pour générer un token, vous devez spécifier sa description !"
    });
    return ;
  }

  try {
    const token = await APIToken.create({description: req.body.description, userUsername: req.user.username});
    return res.json(token);
  } catch (e) {
    if (e instanceof UniqueConstraintError) {
      return res.status(400).send({
        message: "Une description identique existe déjà. Nous n'acceptons pas que les descriptions des tokens d'API soient identique !"
      });
    }
    return res.status(500).send({
      message: e.message
    });
  }
};
