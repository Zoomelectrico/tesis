const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

mongoose.Promise = global.Promise;

const formResponseSchema = new mongoose.Schema({
  user: {
    name: {
      type: String,
      required: 'Debe proveer el nombre del usuario',
    },
    email: {
      type: String,
      required: 'Debe proveer el email del usuario',
    },
    major: {
      type: String,
      required: 'Debe proveer la carrera del usuario',
    },
  },
  message: {
    type: String,
    required: 'Debe proveer un mensaje',
  },
});

formResponseSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('FormResponse', formResponseSchema);
