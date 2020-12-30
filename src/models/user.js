const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('email is not valid');
      }
    },
    lowercase: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('age must be a positive number');
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (value.length < 6 || value.includes('password')) {
        throw new Error('value must be 6 and not password');
      }
    },
  },
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log(user.password);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
