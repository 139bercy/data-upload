const router = require('express').Router();
const passport = require('passport');
const controller = require("../controllers/api-token.controller");

router.get(
  "/",
  [passport.authenticate('jwt', { session: false })],
  controller.findAll
);

router.delete(
  "/:id",
  [passport.authenticate('jwt', { session: false })],
  controller.delete
);

router.post(
  "/",
  [passport.authenticate('jwt', { session: false })],
  controller.create
)

module.exports = router;
