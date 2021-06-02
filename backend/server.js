const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
// const cors = require("cors");

require("./app/models");

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
require('./app/routes/index.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
