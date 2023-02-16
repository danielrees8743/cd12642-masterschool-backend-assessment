const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A password is required.'],
    minlength: [8, 'Password must be at least 8 characters.'],
    select: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

//* Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 10
  this.password = await bcrypt.hash(this.password, 10);
  // Remove the passwordConfirm field from the database N/A
  // this.passwordConfirm = undefined;
  next();
});

//* Compare the password with the hashed password
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
