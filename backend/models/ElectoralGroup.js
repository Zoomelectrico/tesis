const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

mongoose.Promise = global.Promise;

const electoralGroupSchema = new mongoose.Schema({
  accepted: {
    type: Number,
    default: 0,
  },
  denomination: {
    type: String,
    required: 'Debe Proveer un nombre para el grupo electoral',
    trim: true,
    uppercase: true,
  },
  color: {
    type: String,
    required: 'Debe proveer un Nombre de Color',
    trim: true,
  },
  colorHex: {
    type: String,
    required: 'Debe proveer un Codigo de Color',
    trim: true,
  },
  number: {
    type: Number,
    required: 'Debe proveer un Numero',
    trim: true,
  },
  logo: {
    type: String,
    required: 'Debe proveer un logotipo',
  },
  representative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postulation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Postulation',
  },
  electionYear: {
    type: Number,
    default: new Date().getFullYear(),
  },
});

electoralGroupSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('ElectoralGroup', electoralGroupSchema);
