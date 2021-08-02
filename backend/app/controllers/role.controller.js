const db = require("../models");

const ROLES = db.ROLES;

exports.findAll = async (req, res) => {
  let roles = await req.user.getRoles();
  roles = roles.map(r => r.name)
  console.log(roles, ROLES)
  if (roles.includes('admin')) {
    console.log(ROLES)
    res.json(ROLES)
  } else {
    res.json([ROLES[0]])
  }
};
