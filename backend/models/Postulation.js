const mongoose = require("mongoose");

const postulationSchema = new mongoose.Schema({
  electoralGroup: {
    required: "Debe proveer un grupo electoral",
    type: mongoose.Schema.Types.ObjectId,
    ref: "ElectoralGroup"
  },
  passed: {
    type: Number, // Yes: 1 | No: 0
    default: 0
  },
  fce: [{ name: String, dni: Number, school: String, charge: String }],
  sports: [{ name: String, dni: Number, school: String }],
  culture: [{ name: String, dni: Number, school: String }],
  services: [{ name: String, dni: Number, school: String }],
  academic: [{ name: String, dni: Number, school: String }],
  responsibility: [{ name: String, dni: Number, school: String }],
  academicCouncil: {
    name: String,
    email: String,
    dni: Number,
    phone: String,
    school: String
  },
  facultyCouncil: [
    {
      name: String,
      dni: Number,
      school: String,
      faculty: String,
      substitute: Number,
      facultyKey: String
    }
  ],
  schools: [
    {
      name: String,
      dni: Number,
      charge: String,
      school: String,
      schoolKey: String
    }
  ],
  schoolCouncil: [
    {
      name: String,
      dni: Number,
      school: String,
      substitute: Number,
      schoolKey: String
    }
  ]
});

module.exports = mongoose.model("Postulation", postulationSchema);
