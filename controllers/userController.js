//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signinToken = (id, tokenTime) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: tokenTime,
  });
};

//- POST /api/users/register
//- Register a new user
//- Public
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

//- POST /api/users/login
//- Login a user
//- Public
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
    if (!user || !(await user.comparePassword(password, user.password))) {
      res.status(400);
      throw new Error('Incorrect email or password');
    }

    //- if all the details are correct the user is logged in and a token will be issued
    const token = signinToken(user._id, process.env.JWT_EXPIRES_IN);
    user.password = undefined;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//- GET /api/users/me
//- Get current user
//- Private
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
