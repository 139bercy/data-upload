const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const { User } = require('../models');
const { secret } = require('./auth.config');

passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      try {
        const currentUser = await User.findOne({ where: { username } });
        if (!currentUser) { return done(null, false); }
        const valid = await currentUser.validPassword(password);
        console.log('valid', valid, await currentUser.validPassword(password));
        if (!valid) { return done(null, false); }
        console.log(currentUser, valid)
        return done(null, currentUser);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  new JWTstrategy({
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromHeader('x-access-token'),
  }, async (token, done) => {
    try {
      const currentUser = await User.findOne({ where: { username: token.username } });
      return done(null, currentUser);
    } catch (error) {
      return done(error);
    }
  }),
);
