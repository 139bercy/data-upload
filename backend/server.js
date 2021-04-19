const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();

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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.post('/api/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = "~/uploads" + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

const db = require("./app/models");
const Role = db.role;
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
  if (typeof process.env['ADMIN_USERNAME'] == 'string' && typeof process.env['ADMIN_EMAIL'] == 'string' && typeof process.env['ADMIN_PASSWORD'] == 'string') {
    console.log('Création du compte admin depuis les informations d\'environnement fournies');
    User.create({
      id: 1,
      username: process.env['ADMIN_USERNAME'],
      email: process.env['ADMIN_EMAIL'],
      password: bcrypt.hashSync(process.env['ADMIN_PASSWORD'], 8),
    }).then(user => user.setRoles([1, 2, 3]))
  } else {
    console.log('Drop and Resync Db');
  }
}
