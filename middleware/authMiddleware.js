const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');

//* Hash the password with the salt rounds of 10
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

//* Compare the password with the hashed password
exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

//* Create a JWT token
exports.signinToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//* Verify the JWT token
exports.verifyToken = async (token) => {
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  return decoded;
};
