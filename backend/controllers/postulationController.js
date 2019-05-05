const mongoose = require("mongoose");
const Postulation = mongoose.model("Postulation");
const Demand = mongoose.model("Demand");
const ElectoralGroup = mongoose.model("ElectoralGroup");

const jsonToArray = json => Object.keys(json).map(key => json[key]);

const facultyReducer = data =>
  [].concat(
    ...Object.keys(data).map(facultyKey =>
      data[facultyKey].advisors.map(advisor => ({
        ...advisor,
        substitute: advisor.substitute && advisor.substitute === "true" ? 1 : 0,
        facultyKey,
        faculty: data[facultyKey].name
      }))
    )
  );

const schoolReducer = data =>
  [].concat(
    ...Object.keys(data).map(schoolKey =>
      data[schoolKey].sc.map(sc => ({
        ...sc,
        school: data[schoolKey].name,
        schoolKey
      }))
    )
  );

const schoolCouncilReducer = data =>
  [].concat(
    ...Object.keys(data).map(schoolKey =>
      data[schoolKey].advisors.map(advisor => ({
        ...advisor,
        substitute: advisor.substitute && advisor.substitute === "true" ? 1 : 0,
        schoolKey,
        school: data[schoolKey].name
      }))
    )
  );

exports.createPostulation = async (req, res) => {
  try {
    const data = {};
    [
      "fce",
      "sports",
      "culture",
      "services",
      "academic",
      "responsibility"
    ].forEach(field => {
      data[field] = {
        ...data[field],
        ...req.body["student-federation-center"][field]
      };
    });

    data.electoralGroup = req.body.electoralGroup;

    data.academicCouncil = req.body["academic-council"];
    data.facultyCouncil = req.body["faculty-council"];
    data.schools = req.body["schools"];
    data.schoolCouncil = req.body["school-council"];

    data.fce = jsonToArray(data.fce);
    data.sports = jsonToArray(data.sports);
    data.culture = jsonToArray(data.culture);
    data.services = jsonToArray(data.services);
    data.academic = jsonToArray(data.academic);
    data.responsibility = jsonToArray(data.responsibility);
    data.facultyCouncil = facultyReducer(data.facultyCouncil);
    data.schools = schoolReducer(data.schools);
    data.schoolCouncil = schoolCouncilReducer(data.schoolCouncil);

    const postulation = await Postulation.create(data);
    console.log(req.body.userId);
    const [demand] = await Promise.all([
      Demand.create({
        user: req.body.userId,
        type: "POSTULACION",
        postulation: postulation._id
      }),
      ElectoralGroup.findOneAndUpdate(
        { _id: req.body.electoralGroup },
        { postulation: postulation._id },
        { new: true }
      ).exec()
    ]);
    res.json({ success: true, postulation, demand });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err });
  }
};

exports.getPostulation = async (req, res) => {
  try {
    const postulation = await Postulation.findById(req.params.id);
    res.json({ success: true, postulation });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.getPostulations = async (req, res) => {
  try {
    const postulations = await Postulation.find({});
    res.json({ success: true, postulations });
  } catch (err) {
    res.json({ success: false, err });
  }
};
