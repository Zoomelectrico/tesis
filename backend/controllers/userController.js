const mongoose = require("mongoose");
const fetch = require("node-fetch");

mongoose.Promise = global.Promise;
const User = mongoose.model("User");

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    res.json({ user, success: true });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.validateUser = async (req, res, next) => {
  const { dni, email, password, rePassword } = req.body;
  const checks = [
    email.endsWith("@correo.unimet.edu.ve") || email.endsWith("@unimet.edu.ve"),
    password === rePassword
  ];
  if (!checks.includes(false)) {
    if (/\./g.test(dni)) {
      req.body.dni = dni.replace(/\./g, "");
    }
    return next();
  }
  throw new Error("Email invalido");
};

exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, dni, carnet, email, password } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      dni,
      carnet,
      email,
      password
    });
    await fetch(`${process.env.BLOCKCHAIN_API_URL}/buildVoter`, {
      method: "post",
      body: JSON.stringify({
        $class: "ve.edu.unimet.ceu.buildVoter",
        uuid: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email
      }),
      headers: { "Content-Type": "application/json" }
    }).then(res2 => res2.json());
    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, err });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {
      firstName,
      lastName,
      email,
      privilege,
      _id,
      dni,
      carnet,
      major
    } = user;
    res.json({
      success: true,
      user: {
        firstName,
        lastName,
        email,
        privilege,
        id: _id,
        dni,
        carnet,
        major
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    ).exec();
    const {
      firstName,
      lastName,
      email,
      privilege,
      _id,
      dni,
      carnet,
      major
    } = user;
    res.json({
      success: true,
      user: {
        firstName,
        lastName,
        email,
        privilege,
        id: _id,
        dni,
        carnet,
        major
      }
    });
  } catch (err) {
    res.json({ success: false, err });
    console.log(err);
  }
};
