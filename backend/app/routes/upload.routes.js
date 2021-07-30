const router = require('express').Router();
const passport = require('passport');
const controller = require("../controllers/upload.controller");

// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

  router.post(
    "/:index",
    [passport.authenticate('jwt', { session: false })],
    controller.upload
  );

// };
module.exports = router;
