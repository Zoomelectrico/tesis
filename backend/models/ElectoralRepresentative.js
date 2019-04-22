const mongoose = require("mongoose");

const electoralRepresentative = new mongoose.Schema({
  firstName: {
    type: String,
    required: "Por favor ingresa un nombre",
    trim: true
  },
  lastName: {
    type: String,
    required: "Por favor ingresa un Apellido",
    trim: true
  },
  dni: {
    type: Number,
    required: "Por favor ingresa un Numero de Cedula"
  },
  carnet: {
    type: String,
    required: "Por favor ingresa un Numero de Carnet"
  },
  email: {
    type: String,
    trim: true,
    lowerCase: true,
    unique: true,
    required: "Por favor ingresa un correo electrónico"
  },
  phone: {
    type: String,
    trim: true,
    required: "Debe proveer un nombre"
  },
  electoralGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ElectoralGroup"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model(
  "ElectoralRepresentative",
  electoralRepresentative
);
