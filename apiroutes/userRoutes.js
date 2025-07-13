const express = require('express');
const { getUsers, getUser, createUser, verifyOTP, loginUser, forgotPassword, resetPassword, logoutUser } = require('../apicontrollers/userController');

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/login')
  .post(loginUser);

router.route('/verify-otp')
  .post(verifyOTP);

router.route('/forgot-password')
  .post(forgotPassword);

router.route('/reset-password')
  .post(resetPassword);

router.route('/logout')
  .post(logoutUser);

router.route('/:id')
  .get(getUser);

module.exports = router;