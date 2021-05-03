const { authJwt } = require("../middleware");
const controller = require("../controllers/environnement.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();

    app.get(
      "/api/environnements",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.findAllEnvironnement
    );

    app.delete(
      "/api/environnements/:id",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.deleteEnvironnement
    );
    app.post(
      "/api/environnements",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.addEnvironnement
    );
  });
};
