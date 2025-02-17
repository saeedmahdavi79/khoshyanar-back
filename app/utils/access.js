const sha256 = require("sha256");

function sha256pass(password) {
  try {
    const passworded = sha256(password);

    return passworded;
  } catch (error) {
    return error;
  }
}

module.exports = { sha256pass };
