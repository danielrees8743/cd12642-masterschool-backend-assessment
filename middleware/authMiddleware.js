const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('../models/userModel');

//* Verify the JWT token
exports.verifyToken = async (req, res, next) => {
  // const token = req.headers.authorization.split(' ')[1];
  const decoded = await util.promisify(jwt.verify)(
    //* token from the headers
    req.headers.authorization.split(' ')[1],
    process.env.JWT_SECRET
  );
  req.user = await User.findById(decoded._id).select('-password');
  next();
};
