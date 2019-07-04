// System modules
const path = require('path');
// npm dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const { promisify } = require('es6-promisify');
// Routes
const routes = require('./routes/index');
// App Creation
const app = express();
// Regular Middleware
app.disable('x-powered-by');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(cors());
// Sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});
// Passport Config
require('./config/passport');
// Passport Config
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);
app.use((err, req, res, next) => {
  if (err) {
    if (
      err.message === 'La Contrasena no es correcta' ||
      err.message === 'No se ha encontrado al Usuario'
    ) {
      res.status(200).json({ success: false, err: new Error(err.message) });
    }
  }
  next();
});
module.exports = app;
