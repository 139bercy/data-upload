const router = require('express').Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");
const moment = require('moment-timezone');
const uuid = require('uuid');

const nodemailer = require('nodemailer');
const Template = require('../services/template');

const { secret, ttl } = require("../config/auth.config");
const mailerConfig = require("../config/nodemailer.config");

const { User } = require("../models");

let transporter = nodemailer.createTransport({
  port: mailerConfig.mailPort,
  host: mailerConfig.mailHost,
  secure: false, // TODO use TLS !
  // auth: {
  //   user: mailerConfig.MAIL_USERNAME,
  //   password: mailerConfig.MAIL_PASSWORD,
  //   type: 'login'
  // },
  logger: true
})


router.post("/signin",
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    console.log('TOTO', req.user);

    let user = req.user;
    let roles = await user.getRoles();
    roles = roles.map(role => role.name)

    const token = jwt.sign({ username: user.username, roles: roles }, secret, { expiresIn: ttl });
    console.info(user.username + ' has logged in with roles ', roles);
    res
    .header('x-access-token', token)
    .status(200)
    .send({
      username: user.username,
      email: user.email,
      roles: roles,
      accessToken: token
    });
  }
);

router.post("/reset-password",
  async (req, res) => {
    email = req.body.email;
    try {
      // TODO Find the associated user
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        const token = uuid.v4() + uuid.v4()+ uuid.v4();
        var urlToken = req.protocol + '://' + req.get('host') + `/reset-password/${token}`;
        // TODO register token and expiration date
        user.resetPasswordToken = token;
        user.resetPasswordExpires = moment().add(ttl);
        await user.save()
        await transporter.sendMail({
          from: mailerConfig.mailSender,
          to: req.body.email,
          subject: "Demande de réinitialisation de mot de passe",
          html: await Template(
            {
              email: email,
              url: urlToken,
              date: moment().locale('fr').tz('Europe/Paris').format("DD MMMM yyyy à HH:mm")
            }, mailerConfig.templateFolder + 'mail/reset-password-email.html')
        })
        res.status(200).send({message: "Demande de réinitialisation de mot de passe prise en compte"})

      }
    }catch (error) {
      console.log(error);
      // On renvoie un succes pour ne pas aider un attaquant à trouver un compte valide
      res.status(200).send({message: "Demande de réinitialisation de mot de passe prise en compte"})
    }
  }
);

router.post("/reset-password/:token",
  async (req, res) => {
    const user = await User.findOne({ where: { resetPasswordToken: req.params.token } });
    if (user && moment(user.resetPasswordExpires).isAfter(moment())) {
      user.password = req.body.password
      user.resetPasswordToken = null
      user.resetPasswordExpires = null
      try {
        await user.save()
      } catch (error) {
        res.status(406).send(error.errors.map(err => err.message))
      }
      res.status(201).send();
    } else {
      res.status(403).send({message: "Impossible de réinitialiser le mot de passe. Veuillez refaire une demande."})
    }
  }
);

module.exports = router;
