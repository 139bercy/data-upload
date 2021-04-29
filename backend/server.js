const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();

app.use(fileUpload({
    createParentPath: true
}));
// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/upload.routes')(app);
require('./app/routes/environnement.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const Role = db.role;
const Env = db.environnement;
const User = db.user;

// force will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  if (process.env['RESET']) {
    console.log('Réinitialisation de la base de données');
    initial();
  }
});

async function initial() {

  // await User.drop();
  // await Role.drop();
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });
  Role.create({
    id: 3,
    name: "admin"
  });

  Env.create({
    id: 1,
    name: "plan-relance"
  });
  Env.create({
    id: 2,
    name: "data-360"
  });

  if (typeof process.env['ADMIN_USERNAME'] == 'string' && typeof process.env['ADMIN_EMAIL'] == 'string' && typeof process.env['ADMIN_PASSWORD'] == 'string') {
    console.log('Création du compte admin depuis les informations d\'environnement fournies');
    User.create({
      id: 1,
      username: process.env['ADMIN_USERNAME'],
      email: process.env['ADMIN_EMAIL'],
      password: bcrypt.hashSync(process.env['ADMIN_PASSWORD'], 8),
      environnements:[1,2]
    }).then(user => user.setRoles([1, 2, 3]))
  } else {
    console.log('Drop and Resync Db');
  }
}
