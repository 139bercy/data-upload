const config = require("../config/db.config.js");
const { reset, update } = require("./reset-database.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.user = require("../models/user.model.js")(sequelize);
db.role = require("../models/role.model.js")(sequelize);
db.environnement = require("../models/environnement.model.js")(sequelize)

require("../models/relation-role-user.js")(db);
require("../models/relation-user-user.js")(db);
require("../models/relation-environnement-user.js")(db);

db.ROLES = ["user", "moderator", "admin"];

if (process.env['RESET'] === "true") {
  console.log("reset");
  reset(sequelize);
} else {
  console.log("update");
  update(sequelize);
}

module.exports = db;
