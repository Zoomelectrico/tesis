const { exec } = require("child_process");

try {
  exec("npm run startComposer");
} catch (err) {
  console.log(err);
}
