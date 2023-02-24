const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('../models/userModel');

//* Verify the JWT token
exports.verifyToken = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return res.status(401).json({ message: 'No token found' });
  }
  try {
    //* Get the token from the headers and verify it
    const decoded = await util.promisify(jwt.verify)(
      //* token from the headers
      req.headers.authorization.split(' ')[1],
      process.env.JWT_SECRET
    );
    req.user = await User.findById(decoded._id).select('-password');

    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ message: 'Oh no! invalid login in. Please login and try again' });
  }
};
