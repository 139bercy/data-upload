const router = require('express').Router();
const passport = require('passport');
const controller = require("../controllers/upload.controller");

router.post(
  "/:index",
  passport.authenticate(['jwt', 'api-token'], { session: false }),
  controller.upload
);

module.exports = router;
