// System modules
// npm dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const promisify = require("es6-promisify").promisify;
// Routes
const routes = require("./routes/index");
// App Creation
const app = express();
// Regular Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// Sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});
// Passport Config
require("./config/passport"); // Passport Config
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", routes);
module.exports = app;
