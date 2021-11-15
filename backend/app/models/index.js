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

db.User = require("./user.model.js")(sequelize);
db.Role = require("./role.model.js")(sequelize);
db.Index = require("./index.model.js")(sequelize)
db.APIToken = require("./api-token.model.js")(sequelize);

require("./relation-role-user.js")(db);
require("./relation-user-user.js")(db);
require("./relation-index-user.js")(db);
require("./relation-api-token-user.js")(db);

db.ROLES = ["user", "moderator", "admin"];

if (process.env['RESET'] === "true") {
  console.log("reset");
  reset(sequelize);
} else {
  console.log("update");
  update(sequelize);
}

module.exports = db;
