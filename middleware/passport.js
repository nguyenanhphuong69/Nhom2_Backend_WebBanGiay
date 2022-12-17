const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");

passport.use(
  new googleStrategy(
    {
      clientID:
        "191315845004-h1pcnjdvka9k2c9b29g6hoo1nqli5k86.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;