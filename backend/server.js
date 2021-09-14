const express = require("express");
const morgan = require('morgan');
const passport = require('passport');
// const session = require('express-session');
const fileUpload = require('express-fileupload');

require("./app/models");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// app.use(session({ secret: process.env['SECRET'] ?? "my-secret" }));
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
require('./app/config/passport.config');


app.use(fileUpload({
  createParentPath: true
}));

// set routes
const router = require('express').Router();
router.use('/api/auth', require('./app/routes/auth.routes'));
router.use('/api/users', require('./app/routes/user.routes'));
router.use('/api/upload', require('./app/routes/upload.routes'));
router.use('/api/indexes', require('./app/routes/index.routes'));
router.use('/api/roles', require('./app/routes/roles.routes'));

app.use(process.env.PUBLIC_URL, router)

app.use(morgan('dev'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
