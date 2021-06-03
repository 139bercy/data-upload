const { authJwt } = require("../middleware");
const controller = require("../controllers/index.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();

    app.get(
      "/api/indexes",
      [authJwt.verifyToken],
      controller.findAll
    );

    app.delete(
      "/api/indexes/:id",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.delete
    );
    app.post(
      "/api/indexes",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.add
    );
  });
};
