import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import User from '../src/models/user.js';

const GoogleStrategy = passportGoogle.Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: process.env.googlecallbackURL
  },
  async (accessToken, refreshToken, profile, cb) => {
  try{
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
      cb(null, user);
    } else {
      user = await User.create({
        name: profile.displayName,
        email: `${profile.id}@${profile.provider}.ru`,
        password: profile.id,
        googleId: profile.id,
      });
      cb(null, user);
    }
  } catch({message}) {
    console.error('passportGoogle.js file', message)
    cb(message)
  }
  }
));
