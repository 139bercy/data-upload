const router = require('express').Router();
const passport = require('passport');
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

router.get(
  "/",
  [passport.authenticate('jwt', { session: false }), authJwt.isModeratorOrAdmin],
  controller.findAllUsers
);

router.get(
  "/:id",
  [passport.authenticate('jwt', { session: false })],
  controller.getUser
);

router.delete(
  "/:id",
  [passport.authenticate('jwt', { session: false }), authJwt.isModeratorOrAdmin],
  controller.deleteUser
);

router.put(
  "/:id",
  [passport.authenticate('jwt', { session: false }), authJwt.isModeratorOrAdmin],
  controller.updateUser
);

router.post(
  "/",
  [passport.authenticate('jwt', { session: false }), authJwt.isModeratorOrAdmin],
  controller.createUser
)

module.exports = router;
