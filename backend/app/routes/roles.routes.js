const router = require('express').Router();
const passport = require('passport');
const { authJwt } = require("../middleware");
const controller = require("../controllers/role.controller");

router.get(
  "/",
  [passport.authenticate('jwt', { session: false }), authJwt.isModeratorOrAdmin],
  controller.findAll
);

module.exports = router;
