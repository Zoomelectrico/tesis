const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const extract = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const User = mongoose.model("User");
const { SECRET_JWT } = process.env;

passport.serializeUser((user, done) => {
  if (user) return done(false, user._id);
  return done(new Error("User undefined"), false);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) return done(new Error("User not Found!"), false);
    return done(false, user);
  } catch (err) {
    done(err, false);
  }
});

// Sign In
passport.use(
  "signin",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user)
          return done(new Error("No se ha encontrado al Usuario"), false, {
            message: "No se ha encontrado al Usuario"
          });
        const compare = await user.comparePassword(password, user.password);
        if (!compare)
          return done(new Error("La Contrasena no es correcta"), false, {
            message: "La Contrasena no es correcta"
          });
        return done(false, user, { message: "User Logged In" });
      } catch (err) {
        done(err, false, { message: "Database Error" });
      }
    }
  )
);
// Protected Routes
passport.use(
  "jwt",
  new JWTStrategy(
    {
      secretOrKey: SECRET_JWT,
      jwtFromRequest: extract.fromAuthHeaderAsBearerToken()
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id, "-password");
        if (!user) {
          done(
            new Error("Cannot access this route", false, {
              message: "Error on user"
            })
          );
        } else {
          done(false, user, { message: "You have authorization" });
        }
      } catch (err) {
        done(err, false, { message: "Database Error" });
      }
    }
  )
);
