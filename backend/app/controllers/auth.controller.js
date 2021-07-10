const Sequelize = require("sequelize");

const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const transporter = nodemailer.createTransport({
  host: "mailhog",
  port: 1025
});

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        return Role.findAll({
          where: {
            name: {
              [Sequelize.Op.or]: req.body.roles
            }
          }
        }).then(roles => user.setRoles(roles))
      } else {
        // user role = 1
        return user.setRoles(['user'])
      }
    })
    .then(user => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: err.message });
    });
};


exports.passwordReset = (req, res) => {
  // Save User to Database
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "L'utilisateur n'existe pas." });
      }
      if (!user.enable) {
        return res.status(403).send({ message: "Votre compte n'est pas actif." });
      }

      // TODO: send email to the user
      
      const messageStatus = transporter.sendMail({
        from: "My Company <company@companydomain.org>",
        to: email,
        subject: "reset password",
        text: "This is the email content",
      });
    
      if (!messageStatus) console.log("Error sending message!");
    
      console.log("Mail Sent!");
    
      
    })
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    },
    include: 'roles'
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "L'utilisateur n'existe pas." });
      }
      if (!user.enable) {
        return res.status(403).send({ message: "Votre compte n'est pas actif." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe incorrect !"
        });
      }

      return user
    })
    .then(user => {

        const authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push(user.roles[i].name);

        }
        const token = jwt.sign({ username: user.username, roles: authorities }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        console.info(user.username + ' has logged in with roles ', authorities);
        res.status(200).send({
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};
