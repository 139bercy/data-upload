const router = require('express').Router();
const passport = require('passport');
const { authJwt } = require("../middleware");
const controller = require("../controllers/index.controller");

// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();

    router.get(
      "/",
      [passport.authenticate('jwt', { session: false })],
      controller.findAll
    );

    router.delete(
      "/:id",
      [passport.authenticate('jwt', { session: false }), authJwt.isAdmin],
      controller.delete
    );
    router.post(
      "/",
      [passport.authenticate('jwt', { session: false }), authJwt.isAdmin],
      controller.add
    );
  // });
// };
  module.exports = router;
