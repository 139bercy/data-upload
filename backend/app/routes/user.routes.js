const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/users",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.findAllUsers
  );

  app.get(
    "/api/users/:id",
    [authJwt.verifyToken],
    controller.getUser
  );

  app.delete(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.deleteUser
  );

  app.put(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.updateUser
  );

  app.post(
    "/api/users",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.createUser
  )
};
