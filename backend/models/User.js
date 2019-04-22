const mongoose = require("mongoose");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const autoIncrement = require("mongoose-auto-increment");
const bcrypt = require("bcrypt");
const connection = mongoose.createConnection(process.env.DATABASE);
autoIncrement.initialize(connection);

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  code: {
    type: Number,
    unique: true
  },
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
    type: String
  },
  email: {
    type: String,
    trim: true,
    lowerCase: true,
    unique: true,
    required: "Por favor ingresa un correo electrónico"
  },
  password: {
    type: String,
    trim: true,
    require: "Por favor ingrese un contrasena"
  },
  privilege: {
    // 1 elector, 2 representante grupo electoral, 3 administrativo, 4 SUPER ADMIN
    type: Number,
    default: 1
  },
  electoralGroups: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ElectoralGroup" }
  ],
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(autoIncrement.plugin, { model: "User", field: "code" });

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
