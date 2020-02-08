const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET} = process.env;
const { UserModel } = require("../models/user");

const gmailAuthPassport = passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      UserModel.findOne({ email: profile._json.email })
      .then(user => {
        if (user) {
          done(null, user);
          return
        } else {
          UserModel.create({
            name: profile._json.name,
            email: profile._json.email,
            picture: profile._json.picture,
            locale: profile._json.locale
          })
          .then(user => {
           done(null, user);
           return
          })
          .catch(err => {
            console.log(err);
          });
        }
    })
  }
));

gmailAuthPassport.serializeUser((user, cb) => {
  cb(null, user);
});
gmailAuthPassport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = {gmailAuthPassport}
