const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { UniqueTokenStrategy } = require('passport-unique-token');

const { Op } = require("sequelize");

const { User, APIToken } = require('../models');

passport.use('local',
  new LocalStrategy(
    async (username, password, done) => {
      try {
        // On accepte les connexions avec le username OU avec l'email
        const currentUser = await User.findOne({ where: { [Op.or]: [ {username}, {email: username} ] } });
        if (!currentUser) { return done(null, false); }
        const valid = await currentUser.validPassword(password);
        // console.log('valid', valid, await currentUser.validPassword(password));
        if (!valid) { return done(null, false); }
        // console.log(currentUser, valid)
        return done(null, currentUser);
      } catch (err) {
        return done(err);
      }
    },
  ),
);
passport.use('api-token',
  new UniqueTokenStrategy({
    tokenQuery: 'x-api-token',
    tokenParams: 'x-api-token',
    tokenField: 'x-api-token',
    tokenHeader: 'x-api-token',
    failOnMissing: false
  }, async (token, done) => {
      const apiToken = await APIToken.findOne({token: token})
      if (!apiToken) { return done(null, false); }
      const currentUser = await User.findOne({where: {username: apiToken.userUsername}})
      if (!currentUser) { return done(null, false); }
      return done(null, currentUser);
    }
  )
);

passport.use('jwt',
  new JWTstrategy({
    secretOrKey: process.env['SECRET'] ?? "my-secret",
    jwtFromRequest: ExtractJWT.fromHeader('x-access-token'),
  }, async (token, done) => {
    try {
      const currentUser = await User.findOne({ where: { username: token.username } });
      return done(null, currentUser);
    } catch (error) {
      console.error(error)
      return done(null, false);
    }
  }),
);
