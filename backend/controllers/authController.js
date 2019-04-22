const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const promisify = require("es6-promisify").promisify;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { SECRET_JWT } = process.env;

exports.login = async (req, res, next) => {
  const user = req.user;
  await req.login(user);
  const {
    privilege,
    _id,
    firstName,
    lastName,
    dni,
    carnet,
    email,
    code
  } = user;
  const token = jwt.sign({ id: user._id }, SECRET_JWT);
  const _user = {
    privilege,
    _id,
    firstName,
    lastName,
    dni,
    carnet,
    email,
    code
  };
  return res.json({ user: _user, success: true, token });
};

exports.logout = (req, res) => {
  req.logout();
  res.json({ success: true });
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({ success: true, loggedIn: false });
};

exports.forgot = async (req, res) => {
  // 1. See if a user with that email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash("error", "No account with that email exists.");
    return res.redirect("/login");
  }
  // 2. Set reset tokens and expiry on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();
  // 3. Send them an email with the token
  const resetURL = `http://${req.headers.host}/account/reset/${
    user.resetPasswordToken
  }`;
  await mail.send({
    user,
    filename: "password-reset",
    subject: "Password Reset",
    resetURL
  });
  req.flash("success", `You have been emailed a password reset link.`);
  // 4. redirect to login page
  res.redirect("/login");
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    req.flash("error", "Password reset is invalid or has expired");
    return res.redirect("/login");
  }
  // if there is a user, show the rest password form
  res.render("reset", { title: "Reset your Password" });
};

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body["password-confirm"]) {
    next(); // keepit going!
    return;
  }
  req.flash("error", "Passwords do not match!");
  res.redirect("back");
};

exports.update = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    req.flash("error", "Password reset is invalid or has expired");
    return res.redirect("/login");
  }

  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser);
  req.flash(
    "success",
    "💃 Nice! Your password has been reset! You are now logged in!"
  );
  res.redirect("/");
};
