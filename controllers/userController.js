//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { hashPassword } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

const {
  signinToken,
  comparePassword,
  verifyToken,
} = require('../middleware/authMiddleware');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    if (!username || !email || !password) {
      res.status(400);
      throw new Error('Please fill in all fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('Email already exists');
    }
    const user = await User.create({
      username,
      email,
      password /*await hashPassword(password)*/,
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //- if the user did not fill in the email or password then the error will be thrown
    if (!email || !password) {
      res.status(400);
      throw new Error('Please fill in all fields');
    }
    const user = await User.findOne({ email })
      .select('+password')
      .select('-__v');

    //- if the email or password is incorrect the error will be thrown
    if (!user || !(await comparePassword(password, user.password))) {
      res.status(400);
      throw new Error('Incorrect email or password');
    }

    //- if all the details are correct the user is logged in and a token will be issued
    const token = signinToken(user._id);
    user.password = undefined;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  console.log(req.headers);
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.blacklist(token);
    res.status(200).json({ message: 'User logged out' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  const token = await verifyToken(req.headers.authorization.split(' ')[1]);
  console.log(token._id);
  try {
    const user = await User.findById(token).select('-__v');
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
