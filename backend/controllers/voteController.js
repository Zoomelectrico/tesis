const mongoose = require("mongoose");
const fetch = require("node-fetch");
const AES = require("crypto-js/aes");

const User = mongoose.model("User");

exports.canVote = async (req, res) => {
  try {
    const [voter, user] = await Promise.all([
      fetch(
        `${process.env.BLOCKCHAIN_API_URL}/ve.edu.unimet.ceu.Votante/${
          req.params.id
        }`
      ).then(_res => _res.json()),
      User.findById(req.params.id)
    ]);
    if (voter && user) {
      if (
        voter.canVote &&
        !voter.electionsYears.includes(new Date().getFullYear())
      ) {
        return res.json({ success: true, voter, secret: user.secret });
      }
      return res.json({
        success: false,
        err: new Error("Este Usuario ya ha votado o no Puede votar")
      });
    }
    return res.json({
      success: false,
      err: new Error("No se ha encontrado a un Usuario / Votante")
    });
  } catch (err) {
    res.json({
      success: false,
      err: new Error("Ha ocurrido un error con el servior comunicalo a la CEU")
    });
  }
};

exports.canVoteMw = async (req, res, next) => {
  const voter = await fetch(
    `${process.env.BLOCKCHAIN_API_URL}/ve.edu.unimet.ceu.Votante/${
      req.params.id
    }`
  ).then(_res => _res.json());
  if (
    voter.canVote &&
    !voter.electionsYears.includes(new Date().getFullYear())
  ) {
    return next();
  }
  return res.json({
    success: false,
    err: new Error("Este Usuario ya ha votado o no Puede votar")
  });
};

exports.getPostulation = async (req, res) => {
  try {
    const { major, faculty } = req.params;
    const year = new Date().getFullYear();
    let postulations = await fetch(
      `${process.env.BLOCKCHAIN_API_URL}/ve.edu.unimet.ceu.Postulacion`
    ).then(_res => _res.json());
    postulations = postulations.filter(
      postulation => postulation.year === year
    );
    postulations = postulations.map(postulation => {
      const {
        schoolsCouncil,
        facultyCouncil,
        studentsCenters,
        electoralGroup
      } = postulation;
      return {
        $class: postulation.$class,
        uuid: postulation.uuid,
        fce: postulation.fce,
        sports: postulation.sports,
        services: postulation.services,
        culture: postulation.culture,
        academic: postulation.academic,
        responsibility: postulation.responsibility,
        academicCouncil: postulation.academicCouncil,
        schoolsCouncil: schoolsCouncil.filter(
          council => council.school === major
        ),
        facultyCouncil: facultyCouncil.filter(
          council => council.faculty === faculty
        ),
        studentsCenters: studentsCenters.filter(sc => sc.school === major),
        electoralGroup
      };
    });
    res.json({ success: true, postulations });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err: new Error(err.message) });
  }
};

exports.vote = async (req, res) => {
  try {
    let data = AES.decrypt(req.body.data, req.body.key);
    data = JSON.parse(data);
    console.log(data);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, err: new Error(err.message) });
  }
};

exports.computeResults = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    let [votes, postulations] = await Promise.all([
      fetch(`${process.env.BLOCKCHAIN_API_URL}/ve.edu.unimet.ceu.Voto`).then(
        _res => _res.json()
      ),
      fetch(
        `${process.env.BLOCKCHAIN_API_URL}/ve.edu.unimet.ceu.Postulacion`
      ).then(_res => _res.json())
    ]);
    postulations = postulations.filter(
      postulation => postulation.year === year
    );
    const results = {};
    const postulationsIds = postulations.map(({ uuid }) => uuid);
    votes = votes.filter(vote => vote.year === year);
    postulationsIds.forEach(uuid => {
      results[uuid] = {
        fce: votes.reduce((pv, cv) => (cv.fce === uuid ? pv + 1 : pv + 0), 0),
        sports: votes.reduce(
          (pv, cv) => (cv.sports === uuid ? pv + 1 : pv + 0),
          0
        ),
        services: votes.reduce(
          (pv, cv) => (cv.services === uuid ? pv + 1 : pv + 0),
          0
        ),
        culture: votes.reduce(
          (pv, cv) => (cv.culture === uuid ? pv + 1 : pv + 0),
          0
        ),
        academic: votes.reduce(
          (pv, cv) => (cv.academic === uuid ? pv + 1 : pv + 0),
          0
        ),
        responsibility: votes.reduce(
          (pv, cv) => (cv.responsibility === uuid ? pv + 1 : pv + 0),
          0
        ),
        academicCouncil: votes.reduce(
          (pv, cv) => (cv.academicCouncil === uuid ? pv + 1 : pv + 0),
          0
        ),
        schoolsCouncil: votes.reduce(
          (pv, cv) => (cv.schoolsCouncil === uuid ? pv + 1 : pv + 0),
          0
        ),
        facultyCouncil: votes.reduce(
          (pv, cv) => (cv.facultyCouncil === uuid ? pv + 1 : pv + 0),
          0
        ),
        studentsCenters: votes.reduce(
          (pv, cv) => (cv.studentsCenters === uuid ? pv + 1 : pv + 0),
          0
        )
      };
    });
    res.json({ success: true, results });
  } catch (err) {
    res.json({ success: false, err: new Error(err.message) });
  }
};

exports.getResults = async (req, res) => {};

exports.saveResults = async (req, res) => {};
