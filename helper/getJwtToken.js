require("dotenv").config();

const jwt = require("jsonwebtoken");

const getJwtToken = (userId) => {
  return jwt.sign({userId: userId}, process.env.JWT_SECRECT, {expiresIn: "1 day"});
};

module.exports = getJwtToken;
