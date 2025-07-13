const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  otp: {
    type: String,
    required: [true, 'Please add a otp'],
    minlength: 6
  },
  isVerified: {
    type: Number,
    default: 0 // 0 = inactive, 1 = active
  },
  status: {
    type: Number,
    required: [true, 'Please add a otp'],
    default: 0 // 0 = inactive, 1 = active
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'customer'],
    default: 'user'
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpire: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.models.User || mongoose.model('User', userSchema);