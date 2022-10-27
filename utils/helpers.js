const jwt = require("jsonwebtoken");

require("dotenv").config();

/*Signing tokens*/
exports.signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};


