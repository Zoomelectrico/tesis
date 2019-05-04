const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const connection = mongoose.createConnection(process.env.DATABASE);
autoIncrement.initialize(connection);
mongoose.Promise = global.Promise;

const demandSchema = new mongoose.Schema({
  code: Number,
  completed: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Debe proveer un Usuario"
  },
  type: {
    type: String,
    enum: ["REPRESENTANTE", "GRUPO", "POSTULACION", "QUEJA"],
    required: "Debe proveer un tipo de solicitud",
    uppercase: true
  },
  text: String,
  representative: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  electoralGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ElectoralGroup"
  },
  postulation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Postulation"
  }
});

demandSchema.plugin(mongodbErrorHandler);
demandSchema.plugin(autoIncrement.plugin, { model: "Demand", field: "code" });

module.exports = mongoose.model("Demand", demandSchema);
