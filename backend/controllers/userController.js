const mongoose = require('mongoose');
const fetch = require('node-fetch');

mongoose.Promise = global.Promise;
const User = mongoose.model('User');

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    res.json({ user, success: true });
  } catch (err) {
    res.json({ success: false, err: err.message });
  }
};

exports.validateUser = async (req, res, next) => {
  const { dni, email, password, rePassword } = req.body;
  const checks = [
    email.endsWith('@correo.unimet.edu.ve') || email.endsWith('@unimet.edu.ve'),
    password === rePassword,
  ];
  if (!checks.includes(false)) {
    if (/\./g.test(dni)) {
      req.body.dni = dni.replace(/\./g, '');
    }
    return next();
  }
  res.json({ sucess: false, err: 'Email invalido' });
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
      password,
    });
    await fetch(
      `${process.env.BLOCKCHAIN_API_URL}/ve.edu.unimet.ceu.buildVoter`,
      {
        method: 'post',
        body: JSON.stringify({
          $class: 've.edu.unimet.ceu.buildVoter',
          uuid: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    ).then(res2 => res2.json());
    next();
  } catch (err) {
    console.log(err);
    res.json({ success: false, err: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        privilege: user.privilege,
        _id: user._id,
        dni: user.dni,
        carnet: user.carnet,
        major: user.major,
        faculty: user.faculty,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err: err.message });
  }
};

const facultyHelper = major => {
  const faces = [
    'ciencias-administrativas',
    'economia-empresarial',
    'contaduria-publica',
  ];
  const ing = [
    'ingenieria-civil',
    'ingenieria-mecanica',
    'ingenieria-de-produccion',
    'ingenieria-quimica',
    'ingenieria-de-sistemas',
    'ingenieria-electrica',
  ];
  const ciencias = [
    'educacion',
    'idiomas-modernos',
    'matematicas-industriales',
    'psicologia',
  ];
  const juridica = ['estudios-liberales', 'derecho'];
  if (faces.includes(major)) {
    return 'facultad-de-ciencias-economicas-y-sociales';
  }
  if (ing.includes(major)) {
    return 'facultad-de-ingenieria';
  }
  if (ciencias.includes(major)) {
    return 'facultad-de-ciencias-y-artes';
  }
  if (juridica.includes(major)) {
    return 'facultad-de-estudios-juridicos-y-politicos';
  }
  return 'error';
};

exports.updateUser = async (req, res) => {
  try {
    const faculty = facultyHelper(req.body.major);
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body, faculty },
      { new: true }
    ).exec();
    res.json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        privilege: user.privilege,
        _id: user._id,
        dni: user.dni,
        carnet: user.carnet,
        major: user.major,
        faculty: user.faculty,
      },
    });
  } catch (err) {
    res.json({ success: false, err: err.message });
    console.log(err);
  }
};
