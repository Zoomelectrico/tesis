const chars =
  "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890._-=+*!@#$%&";

/**
 * @function genPass
 * @description This function generate a Strong Password
 * @param {Number} The Length of the password
 * @author Jose Rober Quevedo
 * @since 0.1.0
 * @returns {String} a Strong password
 */
const genPass = digits => {
  let vec = new Array(parseInt(digits));
  for (let i = 0; i < vec.length; i++) {
    vec[i] = chars.charAt(parseInt(Math.random() * chars.length));
  }
  console.log(vec);
  return vec.join("");
};

exports.genPass = genPass;
