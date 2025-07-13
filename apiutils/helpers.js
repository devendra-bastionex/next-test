const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Hash password with MD5
const hashPassword = (password) => {
  return CryptoJS.MD5(password).toString();
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// Generate reset password token
const generateResetToken = () => {
  return CryptoJS.lib.WordArray.random(32).toString();
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { generateOTP, hashPassword, generateToken, generateResetToken, verifyToken };