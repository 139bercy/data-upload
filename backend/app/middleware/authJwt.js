
hasRole = async (user, roles) => {
  let currentRoles = await user.getRoles();
  return currentRoles.find(role => {
    return roles.includes(role.name)
  });
}

isUser = async (req, res, next) => {
  if (await hasRole(req.user, ['user'])) {
    next();
    return;
  }
  res.status(403).send({
    message: "Require User Role!"
  });
};

isAdmin = async (req, res, next) => {
  if (await hasRole(req.user, ['admin'])) {
    next();
    return;
  }

  res.status(403).send({
    message: "Require Admin Role!"
  });
};

isModerator = async (req, res, next) => {
  if (await hasRole(req.user, ['moderator'])) {
    next();
    return;
  }

  res.status(403).send({
    message: "Require Moderator Role!"
  });
};

isModeratorOrAdmin = async (req, res, next) => {
  if (await hasRole(req.user, ['moderator', 'admin'])) {
    next();
    return;
  }

  res.status(403).send({
    message: "Require Moderator or Admin Role!"
  });
};

const roleCHecker = {
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isUser: isUser,

};
module.exports = roleCHecker;
