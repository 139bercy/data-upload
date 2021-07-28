const { Op } = require("sequelize");
const db = require("../models");

const User = db.User;
const Role = db.Role;

const userDefaultAttributes = ['username', 'email', 'enable'];
const roleDefaultAttributes = ['name'];

async function mapRoles(user) {
  return {
    ...user.toJSON(),
    roles: (await user.getRoles()).map(role => role.name)
  }
}

async function setRoles(user, roles) {
  console.log(roles)
  await user.setRoles(await Role.findOne({where: {name: {[Op.in]: roles}}}));
  return user;
}

async function setManager(user, manager) {
  await user.setManager(manager)
  return user;
}

exports.findAllUsers = async (req, res) => {
  let request;
  let roles = await req.user.getRoles();
  roles = roles.map(r => r.name)
  if (roles.includes('admin')) {
    request = {
      include: { model: Role, as: 'roles', attributes: roleDefaultAttributes },
      attributes: userDefaultAttributes
    };
  } else {
    request = {
      where: { managerUsername: req.user.username },
      include: { model: Role, as: 'roles', attributes: roleDefaultAttributes },
      attributes: userDefaultAttributes
    };
  }

  users = await User.findAll(request);
  await users.map(async user => { return await mapRoles(user)});
  res.json(users);
};

exports.getUser = async (req, res) => {
  let request = {
    where: { username: req.params.id },
    include: { model: Role, as: 'roles', attributes: roleDefaultAttributes },
    attributes: userDefaultAttributes
  };
  let roles = await req.user.getRoles();
  roles = roles.map(r => r.name)
  if (!roles.includes('admin') && roles.includes('moderator') && req.user.username !== req.params.id) {
    request = {
      where: { username: req.params.id, managerUsername: req.user.username },
      include: { model: Role, as: 'roles', attributes: roleDefaultAttributes },
      attributes: userDefaultAttributes
    };
  } else if (roles.includes('user') && req.user.username !== req.params.id) {
    console.error("En tant qu'utilisateur, il est impossible de récupérer les informations sur un autre utilisateur");
    res.status(403).json({
      message: "En tant qu'utilisateur, il est impossible de récupérer les informations sur un autre utilisateur"
    });
    return;
  }
  let user = await User.findOne(request);
  sendUser(200, user, res);
};

exports.deleteUser = async (req, res) => {
  if (req.params.id === req.user.username) {
    res.status(400).send({
      message: "Vous ne pouvez pas vous supprimer vous même !"
    });
    return;
  }
  await User.destroy({ where: { username: req.params.id } })
      res.status(204).send();
};

exports.updateUser = async (req, res) => {
  let options = { where: { username: req.params.id } };
  let roles = await req.user.getRoles();
  roles = roles.map(r => r.name)
  if (!roles.includes('admin') && roles.includes('moderator')) {
    options = { where: { username: req.params.id, managerUsername: req.user.username } };
  } else if (!roles.includes('admin') && !roles.includes('moderator') && req.user.username !== req.params.id) {
    console.error("En tant qu'utilisateur, il est impossible de modeifier les informations d'un autre utilisateur");
    res.status(403).json({
      message: "En tant qu'utilisateur, il est impossible de modeifier les informations d'un autre utilisateur"
    });
    return;
  }
  let user = await User.findOne(options);
  if (user) {
    user = await user.update(req.body);
    await setRoles(user, req.body.roles);
    sendUser(200, user, res);
  }
};

async function handleManager(currentUsername, user) {
  let currentUser = await User.findByPk(currentUsername);
  roles = await currentUser.getRoles();
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      return {
        ...user,
        manager: currentUser
      };
    }
  }
}

exports.createUser = async (req, res) => {
  userData = await handleManager(req.user.username, req.body)
  let user = await User.create(userData)
  await setRoles(user, req.body.roles);
  await setManager(user, userData.manager);
  sendUser(201, user, res);
};


async function sendUser(status, user, res) {

  user = await mapRoles(user);
  res.status(status).json(user);
}
