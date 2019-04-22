const mongoose = require("mongoose");

const electoralGroupSchema = new mongoose.Schema({
  denomination: {
    type: String,
    required: "Debe Proveer un nombre para el grupo electoral",
    trim: true,
    uppercase: true,
    unique: true
  },
  color: {
    type: String,
    required: "Debe proveer un Color",
    trim: true
  },
  colorHex: {
    type: String,
    required: "Debe proveer un Color",
    trim: true
  },
  number: {
    type: Number,
    required: "Debe proveer un Numero",
    trim: true,
    unique: true
  },
  logo: {
    type: String,
    required: "Debe proveer un logotipo"
  },
  representative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  electionYear: {
    type: Number,
    default: new Date().getFullYear()
  }
});

module.exports = mongoose.model("ElectoralGroup", electoralGroupSchema);
