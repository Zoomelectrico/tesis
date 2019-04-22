const mongoose = require("mongoose");
// Enviroment Variables
require("dotenv").config({ path: "variables.env" });
// Mongoose
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
// Require Models
require("./models/User");
require("./models/ElectoralRepresentative");
require("./models/ElectoralGroup");

const app = require("./app");
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express runing on PORT ${server.address().port}`);
});
