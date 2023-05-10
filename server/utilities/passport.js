const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const Role = require("../models/role");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      // Find or create the user in the database
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          // If the user does not exist, create a new user
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
            birthday: profile.birthday,
            gender: profile.gender,
            isActive: true,
            status: "active",
          });
          user.save(function (err) {
            if (err) console.error(err);
            Role.findOne({ name: "volunteer" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              user.roles = [role._id];
              user.save(function (err) {
                if (err) console.error(err);
                // Generate a JWT token and save it to session
                const token = jwt.sign(
                  { id: user.id },
                  process.env.SECRET_KEY,
                  { expiresIn: "1h" }
                );

                var authorities = [];
                return done(err, { user, token });
              });
            });
          });
        } else {
          // If the user exists, return the user and the JWT token
          // Generate a JWT token and save it to session
          const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });

          var authorities = [];
          console.log(token);
          return done(null, { user, token });
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.fbClientID,
      clientSecret: process.env.fbClientSecret,
      callbackURL:
        "https://volunteerhub-backend.onrender.com/auth/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "email",
        "first_name",
        "last_name",
        "photos",
      ],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({
        facebookId: profile.id,
      });
      if (!user) {
        console.log("Adding new facebook user to DB..");
        const user = new User({
          facebookId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails ? profile.emails[0].value : null,
          image: profile.photos[0].value,
          isActive: true,
          status: "active",
        });
        user.save(function (err) {
          if (err) console.error(err);
          Role.findOne({ name: "volunteer" }, (err, role) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            user.roles = [role._id];
            user.save(function (err) {
              if (err) console.error(err);
              // Generate a JWT token and save it to session
              const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: "1h",
              });

              var authorities = [];
              return cb(err, { user, token });
            });
          });
        });
      } else {
        console.log("Facebook User already exists in DB..");
        // Generate a JWT token and save it to session
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        var authorities = [];
        console.log(token);
        return cb(null, { user, token });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
