const router = require('express').Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");

const { secret, ttl } = require("../config/auth.config");

router.post("/signin",
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    console.log(req.user);

    let user = req.user;
    let roles = await user.getRoles();
    roles = roles.map(role => role.name)

    const token = jwt.sign({ username: user.username, roles: roles }, secret, { expiresIn: ttl });
    console.info(user.username + ' has logged in with roles ', roles);
    res
    .header('x-access-token', token)
    .status(200)
    .send({
      username: user.username,
      email: user.email,
      roles: roles,
      accessToken: token
    });
  }
);

module.exports = router;
