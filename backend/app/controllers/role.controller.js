const db = require("../models");

const ROLES = db.ROLES;

exports.findAll = async (req, res) => {
  let roles = await req.user.getRoles();
  roles = roles.map(r => r.name)
  if (roles.includes('admin')) {
    res.json(ROLES)
  } else {
    res.json([ROLES[0]])
  }
};
