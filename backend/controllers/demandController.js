const mongoose = require("mongoose");
const fetch = require("node-fetch");
const uuidv4 = require("uuid/v4");
const Demand = mongoose.model("Demand");
const User = mongoose.model("User");
const ElectoralGroup = mongoose.model("ElectoralGroup");
const Postulation = mongoose.model("Postulation");

exports.creteDemand = async (req, res) => {
  try {
    const { text, type, user } = req.body;
    const demand = await Demand.create({ text, type, user });
    res.json({ success: true, demand });
  } catch (err) {
    res.json({ success: false, err: new Error(err.message) });
    console.log(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const [representative, group, postulation, complain] = await Promise.all([
      Demand.find({ completed: 0, type: "REPRESENTANTE" })
        .populate("user")
        .populate("representative"),
      Demand.find({ completed: 0, type: "GRUPO" })
        .populate("user")
        .populate("electoralGroup"),
      Demand.find({ completed: 0, type: "POSTULACION" })
        .populate("user")
        .populate("postulation")
        .populate({
          path: "postulation",
          populate: {
            path: "electoralGroup"
          }
        }),
      Demand.find({ completed: 0, type: "QUEJA" }).populate("user")
    ]);
    const demands = {
      representative,
      group,
      postulation,
      complain
    };
    res.json({ success: true, demands });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err: new Error(err.message) });
  }
};

exports.getDemand = async (req, res) => {
  try {
    const demand = await Demand.findById(req.params.id);
    if (demand) {
      res.json({ success: true, demand });
    } else {
      res.json({
        success: false,
        err: new Error("No se ha encontrado una Solicitud con ese codigo")
      });
    }
  } catch (err) {
    res.json({ err, success: false });
  }
};

exports.markComplete = async (req, res) => {
  try {
    const demand = await Demand.findById(req.params.id);
    if (demand) {
      demand.completed = 1;
      await demand.save();
      res.json({ success: true, demand });
    } else {
      res.json({
        success: false,
        err: new Error("No se ha encontrado una Solicitud con ese codigo")
      });
    }
  } catch (err) {
    res.json({ err, success: false });
  }
};

exports.makeRepresentative = async (req, res) => {
  try {
    const { userId, id } = req.body;
    const [user, demand] = await Promise.all([
      User.findOneAndUpdate(
        { _id: userId },
        { privilege: 2 },
        { new: true }
      ).exec(),
      Demand.findOneAndUpdate(
        { _id: id },
        { completed: 1 },
        { new: true }
      ).exec()
    ]);
    if (user && demand) {
      const er = await fetch(
        `${
          process.env.BLOCKCHAIN_API_URL
        }/ve.edu.unimet.ceu.buildElectoralRepresentative`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            $class: "ve.edu.unimet.ceu.buildElectoralRepresentative",
            uuid: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: `${user.email}`,
            dni: `${user.dni}`
          })
        }
      ).then(_res => _res.json());
      console.log(JSON.stringify(er));
      return res.json({ success: true, demand });
    }
    res.json({
      success: false,
      err: new Error("No se ha encontrado la Solicitud o el Usuario")
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err: new Error(err.message) });
  }
};

exports.includeElectoralGroup = async (req, res) => {
  try {
    const { egId, id } = req.body;
    const [electoralGroup, demand, presidents] = await Promise.all([
      ElectoralGroup.findOneAndUpdate(
        { _id: egId },
        { accepted: 1 },
        { new: true }
      ).exec(),
      Demand.findOneAndUpdate(
        { _id: id },
        { completed: 1 },
        { new: true }
      ).exec(),
      fetch(
        `${
          process.env.BLOCKCHAIN_API_URL
        }/ve.edu.unimet.ceu.PresidenteElectoral`
      ).then(_res => _res.json())
    ]);
    if (electoralGroup && demand) {
      const eg = await fetch(
        `${
          process.env.BLOCKCHAIN_API_URL
        }/ve.edu.unimet.ceu.buildElectoralGroup`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            $class: "ve.edu.unimet.ceu.buildElectoralGroup",
            uuid: electoralGroup._id,
            name: electoralGroup.denomination,
            colorHex: electoralGroup.colorHex,
            colorName: electoralGroup.colorName,
            logo: electoralGroup.logo,
            number: electoralGroup.number,
            electionYear: new Date().getFullYear(),
            electoralRepresentative: electoralGroup.representative,
            electoralPresident: presidents[presidents.length - 1].uuid
          })
        }
      ).then(_res => _res.json());

      return res.json({ success: true, demand });
    }
    res.json({
      success: false,
      err: new Error("No se ha encontrado la Solicitud o el Grupo Electoral")
    });
  } catch (err) {
    res.json({ success: false, err: new Error(err.message) });
  }
};

exports.includePostulation = async (req, res) => {
  try {
    const { pId, id } = req.body;
    const [postulation, demand] = await Promise.all([
      Postulation.findOneAndUpdate(
        { _id: pId },
        { passed: 1 },
        { new: true }
      ).exec(),
      Demand.findOneAndUpdate(
        { _id: id },
        { completed: 1 },
        { pnew: true }
      ).exec()
    ]);
    if (postulation && demand) {
      await fetch(
        `${process.env.BLOCKCHAIN_API_URL}/ve.edu.unimet.ceu.buildPostulation`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildPostulation(postulation))
        }
      );
      return res.json({ success: true, demand });
    }
    res.json({
      success: false,
      err: new Error("No se ha encontrado la Solicitud o la Postulacion")
    });
  } catch (err) {
    res.json({ success: false, err: new Error(err.message) });
  }
};

const buildPostulation = postulation => {
  const obj = {
    $class: "ve.edu.unimet.ceu.buildPostulation",
    year: new Date().getFullYear(),
    uuid: postulation._id,
    fce: {
      $class: "ve.edu.unimet.ceu.PostulacionFCE",
      president: {},
      secretaryGeneral: {},
      interalAffairs: {},
      generalCoordinator: {},
      treasurer: {}
    },
    sports: {
      $class: "ve.edu.unimet.ceu.PostulacionCoD",
      coordinators: postulation.sports.map(({ name, dni }) => ({
        $class: "ve.edu.unimet.ceu.Coordinador",
        electoralGroup: postulation.electoralGroup,
        name,
        dni,
        substitute: false
      }))
    },
    services: {
      $class: "ve.edu.unimet.ceu.PostulacionCoS",
      coordinators: postulation.services.map(({ name, dni }) => ({
        $class: "ve.edu.unimet.ceu.Coordinador",
        electoralGroup: postulation.electoralGroup,
        name,
        dni,
        substitute: false
      }))
    },
    culture: {
      $class: "ve.edu.unimet.ceu.PostulacionCoC",
      coordinators: postulation.culture.map(({ name, dni }) => ({
        $class: "ve.edu.unimet.ceu.Coordinador",
        electoralGroup: postulation.electoralGroup,
        name,
        dni,
        substitute: false
      }))
    },
    academic: {
      $class: "ve.edu.unimet.ceu.PostulacionCoA",
      coordinators: postulation.academic.map(({ name, dni }) => ({
        $class: "ve.edu.unimet.ceu.Coordinador",
        electoralGroup: postulation.electoralGroup,
        name,
        dni,
        substitute: false
      }))
    },
    responsibility: {
      $class: "ve.edu.unimet.ceu.PostulacionCoRSU",
      coordinators: postulation.responsibility.map(({ name, dni }) => ({
        $class: "ve.edu.unimet.ceu.Coordinador",
        electoralGroup: postulation.electoralGroup,
        name,
        dni,
        substitute: false
      }))
    },
    academicCouncil: {
      $class: "ve.edu.unimet.ceu.PostulacionCA",
      advisers: {
        $class: "ve.edu.unimet.ceu.PostulacionCA",
        advisers: {
          $class: "ve.edu.unimet.ceu.Consejero",
          school: postulation.academicCouncil.school,
          substitute: false,
          name: postulation.academicCouncil.name,
          dni: postulation.academicCouncil.dni
        }
      }
    },
    schoolsCouncil: schoolCouncilHelper(postulation.schoolCouncil),
    facultyCouncil: facultyCouncilHelper(postulation.facultyCouncil),
    studentsCenters: schoolHelper(
      postulation.schools,
      postulation.electoralGroup
    ),
    electoralGroup: postulation.electoralGroup
  };

  [
    "president",
    "secretaryGeneral",
    "interalAffairs",
    "generalCoordinator",
    "treasurer"
  ].forEach((key, i) => {
    obj.fce[key] = {
      $class: "ve.edu.unimet.ceu.Postulado",
      school: postulation.fce[i].school,
      charge: postulation.fce[i].charge,
      electoralGroup: postulation.electoralGroup,
      name: postulation.fce[i].name,
      dni: postulation.fce[i].dni,
      id: "string"
    };
  });
  return obj;
};

const schoolCouncilHelper = schoolCouncil => {
  const vec = [];
  let key = "";
  let i = 0;
  schoolCouncil.forEach(({ name, schoolKey: school, dni, substitute }) => {
    if (key !== school) {
      key = school;
      i++;
    }
    vec[i] = {
      ...vec[i],
      $class: "ve.edu.unimet.ceu.PostulacionCE",
      school
    };
    if (!vec[i].advisers) {
      vec[i].advisers = [];
    }
    vec[i].advisers.push({
      name,
      school,
      dni,
      substitute: substitute === 1
    });
  });
  return vec.filter(x => x !== false || null || undefined);
};

const facultyCouncilHelper = facultyCouncil => {
  const vec = [];
  let key = "";
  let i = 0;
  facultyCouncil.forEach(
    ({ name, facultyKey: faculty, dni, substitute, school }) => {
      if (key !== faculty) {
        key = faculty;
        i++;
      }
      vec[i] = {
        ...vec[i],
        $class: "ve.edu.unimet.ceu.PostulacionCF",
        faculty
      };
      if (!vec[i].advisers) {
        vec[i].advisers = [];
      }
      vec[i].advisers.push({
        name,
        school,
        dni,
        substitute: substitute === 1
      });
    }
  );
  return vec.filter(x => x !== false || null || undefined);
};

const schoolHelper = (schools, electoralGroup) =>
  [
    "ciencias-administrativas",
    "economia-empresarial",
    "contaduria-publica",
    "ingenieria-civil",
    "ingenieria-mecanica",
    "ingenieria-de-produccion",
    "ingenieria-quimica",
    "ingenieria-de-sistemas",
    "ingenieria-electrica",
    "educacion",
    "idiomas-modernos",
    "matematicas-industriales",
    "psicologia",
    "estudios-liberales",
    "derecho"
  ].map(school => ({
    $class: "ve.edu.unimet.ceu.PostulacionCEE",
    school,
    president: {
      $class: "ve.edu.unimet.ceu.Postulado",
      electoralGroup,
      ...(schools.filter(
        ({ charge, schoolKey }) =>
          schoolKey === school && charge === "Presidente"
      ).length > 0
        ? schools.filter(
            ({ charge, schoolKey }) =>
              schoolKey === school && charge === "Presidente"
          )[0]
        : {})
    },
    generalCoordinator: {
      $class: "ve.edu.unimet.ceu.Postulado",
      electoralGroup,
      ...(schools.filter(
        ({ charge, schoolKey }) =>
          schoolKey === school && charge === "Coordinador General"
      ).length > 0
        ? schools.filter(
            ({ charge, schoolKey }) =>
              schoolKey === school && charge === "Coordinador General"
          )[0]
        : {})
    },
    treasurer: {
      $class: "ve.edu.unimet.ceu.Postulado",
      electoralGroup,
      ...(schools.filter(
        ({ charge, schoolKey }) => schoolKey === school && charge === "Tesorero"
      ).length > 0
        ? schools.filter(
            ({ charge, schoolKey }) =>
              schoolKey === school && charge === "Tesorero"
          )[0]
        : {})
    }
  }));
