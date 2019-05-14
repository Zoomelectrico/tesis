const mongoose = require("mongoose");
const fetch = require("node-fetch");
const AES = require("crypto-js/aes");

const User = mongoose.model("User");
const Postulation = mongoose.model("Postulation");

const faculties = [
  "facultad-de-ciencias-economicas-y-sociales",
  "facultad-de-ingenieria",
  "facultad-de-ciencias-y-artes",
  "facultad-de-estudios-juridicos-y-politicos"
];

const majors = [
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
];

const fceCharges = [
'PRESIDENTE',
'SECRETARIO GENERAL',
'SECRETARIO DE ASUNTOS INTERNOS',
'COORDINADOR GENERAL',
'TESORERO'
];

const coordinations = [
'DEPORTES',
'CULTURA',
'SERVICIOS E INFRAESTRUCTURA',
'ACADEMICA',
'RESPONSABILIDAD SOCIAL UNIVERSITARIA'
];

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
        return res.json({
          success: true,
          canVote: true,
          voter,
          secret: user.secret
        });
      }
      return res.json({
        success: true,
        canVote: false,
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
    const ids = postulations.map(({ uuid }) => uuid);
    const _postulations = await Postulation.find({
      _id: { $in: [...ids.map(id => mongoose.Types.ObjectId(id))] }
    }).populate("electoralGroup");
    postulations = postulations.map((p, i) => ({
      ...p,
      electoralGroupName: _postulations[i].electoralGroup.denomination
    }));
    res.json({ success: true, postulations });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err: new Error(err.message) });
  }
};

exports.vote = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const vote = JSON.parse(
      AES.decrypt(req.body.data, user.secret).toString(
        require("crypto-js").enc.Utf8
      )
    );
    const [] = await Promise.all([
      fetch(`${process.env.BLOCKCHAIN_API_URL}/ve.edu.unimet.ceu.Voto`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          $class: "ve.edu.unimet.ceu.Voto",
          ...vote,
          year: new Date().getFullYear()
        })
      }).then(_res => _res.json()),
      fetch(`${process.env.BLOCKCHAIN_API_URL}/ve.edu.unimet.ceu.updateVoter`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          $class: "ve.edu.unimet.ceu.updateVoter",
          uuid: user._id,
          electionsYear: new Date().getFullYear(),
          canVote: true
        })
      }).then(_res => _res.json())
    ]);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err: new Error(err.message) });
  }
};

const preComputeResults = async (p, v) => {
  const year = new Date().getFullYear();
  const postulations = p.filter(
      postulation => postulation.year === year
    );
  const results = {};
  const postulationsIds = postulations.map(({ uuid }) => uuid);
  const _postulations = await Postulation.find({
    _id: {
      $in: [...postulationsIds.map(id => mongoose.Types.ObjectId(id))]
    }
  }).populate("electoralGroup");
  const votes = v.filter(vote => vote.year === year);
  postulationsIds.forEach((uuid, i) => {
    results[uuid] = {
      year: new Date().getFullYear(),
      name: _postulations[i].electoralGroup.denomination,
      color: _postulations[i].electoralGroup.colorHex,
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
      schoolsCouncil: schoolsCouncilHelper(uuid, votes),
      facultyCouncil: facultyCouncilHelper(uuid, votes),
      studentsCenters: studentsCentersHelper(uuid, votes)
    };
  });
  return results;

}

const totalCordinationsHelper = result => result.sports + result.services + result.culture + result.academic + result.responsibility


/**
 * @function
 * @description
 * @param {*} uuid
 * @param {*} votes
 * @returns {Object}
 */
const studentsCentersHelper = (uuid, votes) => {
  const obj = {};
  majors.forEach(major => {
    obj[major] = votes.reduce(
      (pv, cv) => (cv.studentsCenters === `${uuid}-${major}` ? pv + 1 : pv + 0),
      0
    );
  });
  return obj;
};

/**
 * @function
 * @description
 * @param {*} uuid
 * @param {*} votes
 * @returns {Object}
 */
const facultyCouncilHelper = (uuid, votes) => {
  const obj = {};
  faculties.forEach(faculty => {
    obj[faculty] = votes.reduce(
      (pv, cv) =>
        cv.facultyCouncil === `${uuid}-${faculty}` ? pv + 1 : pv + 0,
      0
    );
  });
  return obj;
};

/**
 * @function
 * @description
 * @param {*} uuid
 * @param {*} votes
 * @returns {Object}
 */
const schoolsCouncilHelper = (uuid, votes) => {
  const obj = {};
  majors.forEach(major => {
    obj[major] = votes.reduce(
      (pv, cv) => (cv.schoolsCouncil === `${uuid}-${major}` ? pv + 1 : pv + 0),
      0
    );
  });
  return obj;
};

const resolveCharge = (idx, fce = true) => fce ? fceCharges[idx] : coordinations[idx];

const dhontMatrix = (results, steps) => {
  const groups = Object.keys(results).length; // 4
  const matrix = [];
  for (let i = 0; i < groups; i++) { // [0...3]
    matrix[i] = [];
    const votes = results[i];
    for (let j = 0; j < steps; j++) { // [0...6]
      matrix[i][j] = votes / (j+1);
      }
  }
  return matrix;
}

const dhont = matrix => {
  const maxs = new Array(matrix[0].length);
  for (let i = 0; i < maxs.length; i++) {
    let max = Math.max.apply(null, matrix.map(row => Math.max.apply(Math, row)));
    for (let j = 0; j < matrix.length; j++) {
      for (let k = 0; k < matrix[j].length; k++) {
        if(matrix[j][k] === max) {
          maxs[i] = { val: max, i: j, j: k };
          matrix[j][k] = -1;
          ;
        }
      }
    }
  }
  return maxs;
}

const computeFCE = (results) => {
  const preResultsFCE = Object.keys(results).map(uuid => ({ uuid, totalFCE: results[uuid].fce })).sort((a, b) => b.totalFCE - a.totalFCE);
  return dhont(dhontMatrix(preResultsFCE.map(({ totalFCE }) => totalFCE), 5)).map(({ i }, idx) => ({ electoralGroup: preResultsFCE[i].uuid, charge: resolveCharge(idx) }));

}

const computeCordinations = (results) => {
  Object.keys(results).forEach(uuid => {
    results[uuid].totalCordinations = totalCordinationsHelper(results[uuid]);
  })
  const preResultsCordinations = Object.keys(results).map(uuid => ({ uuid, totalCordinations: results[uuid].totalCordinations })).sort((a, b) => b.totalCordinations - a.totalCordinations);
  return dhont(dhontMatrix(preResultsCordinations.map(({ totalCordinations }) => totalCordinations), 5)).map(({i}, idx)=> ({ electoralGroup: preResultsCordinations[i].uuid, charge: resolveCharge(idx, false) }));
}

const computeStudentCenters = (results) => {
  const vec = []
  Object.keys(results).forEach(uuid => {
    const studentsCenters = results[uuid].studentsCenters;
    Object.keys(studentsCenters).forEach(major => {
      vec.push({ major, uuid, val: studentsCenters[major] })
    })
  })
  const obj = {}
  majors.forEach(majorKey => {
    const preResults = vec.map(({ major, uuid, val }) => major === majorKey ? ({ uuid, val }) : false).filter(x => x !== false).sort((a, b) => b.val - a.val);
    obj[majorKey] = {
      result: dhont(dhontMatrix(preResults.map(({ val }) => val), 3))
        .map(({val, i}, idx) =>
          val > 0 ?
            ({ electoralGroup: preResults[i].uuid, charge: idx === 0 ? 'PRESIDENTE' : idx === 1 ? 'COORDINADOR GENERAL' : 'TESORERO' }) : false)
        .filter(x => x !== false),
    }
  });
  return obj
};

const computeSchoolCouncil = (results) => {
const vec = []
  Object.keys(results).forEach(uuid => {
    const schoolsCouncil = results[uuid].schoolsCouncil;
    Object.keys(schoolsCouncil).forEach(major => {
      vec.push({ major, uuid, val: schoolsCouncil[major] })
    })
  })
  const obj = {}
  majors.forEach(majorKey => {
    const preResults = vec.map(({ major, uuid, val }) => major === majorKey ? ({ uuid, val }) : false).filter(x => x !== false).sort((a, b) => b.val - a.val);
    obj[majorKey] = {
      result: dhont(dhontMatrix(preResults.map(({ val }) => val), 4))
        .map(({val, i}, idx) =>
          val > 0 ?
            ({ electoralGroup: preResults[i].uuid, charge: 'CONSEJERO' }) : false)
        .filter(x => x !== false),
    }
  });
  return obj
}

const computeFacultyCouncil = (results) => {
  const vec = []
  Object.keys(results).forEach(uuid => {
    const facultyCouncil = results[uuid].facultyCouncil;
    Object.keys(facultyCouncil).forEach(faculty => {
      vec.push({ faculty, uuid, val: facultyCouncil[faculty] })
    })
  })
  const obj = {}
  faculties.forEach(facultyKey => {
    const preResults = vec.map(({ faculty, uuid, val }) => faculty === facultyKey ? ({ uuid, val }) : false).filter(x => x !== false).sort((a, b) => b.val - a.val);
    obj[facultyKey] = {
      result: dhont(dhontMatrix(preResults.map(({ val }) => val), 4))
        .map(({val, i}, idx) =>
          val > 0 ?
            ({ electoralGroup: preResults[i].uuid, charge: 'CONSEJERO' }) : false)
        .filter(x => x !== false),
    }
  });
  return obj
}

exports.computeResults = async (req, res) => {
  try {
    const [votes, postulations] = await Promise.all([
      fetch(`${process.env.BLOCKCHAIN_API_URL}/ve.edu.unimet.ceu.Voto`).then(
        _res => _res.json()
      ),
      fetch(
        `${process.env.BLOCKCHAIN_API_URL}/ve.edu.unimet.ceu.Postulacion`
      ).then(_res => _res.json())
    ]);
    const results = await preComputeResults(postulations, votes);
    const fceResults = computeFCE(results);
    const cordinationsResults = computeCordinations(results);
    const studentsCenters = computeStudentCenters(results);
    const schoolCouncil = computeSchoolCouncil(results);
    const facultyCouncil = computeFacultyCouncil(results);

    res.json({ success: true, results, fceResults, cordinationsResults, studentsCenters, schoolCouncil,facultyCouncil });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err: new Error(err.message) });
  }
};

exports.getResults = async (req, res) => {};

exports.saveResults = async (req, res) => {};
