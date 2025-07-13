const User = require('../apimodels/User');
const { validateUser, validateLogin } = require('../apiutils/validation');
const { sendOTPEmail } = require('../apiutils/otpEmail');
const { generateOTP, hashPassword, generateToken, generateResetToken, verifyToken } = require('../apiutils/helpers');
const { sendResetPasswordEmail } = require('../apiutils/resetPasswordEmail');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Public
exports.createUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    
    // Validate user data
    const validation = validateUser({ name, email, role, password });
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: validation.error 
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email already exists' 
      });
    }
    
    // Generate OTP and hash password
    const otp = generateOTP();
    const hashedPassword = hashPassword(password);
    
    // Create new user
    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
      otp,
      status: 0 // inactive until email verified
    });
    
    // Send response immediately
    res.status(201).json({ 
      success: true, 
      message: 'User created successfully. Please check your email for OTP verification.',
      data: { id: user._id, name: user.name, email: user.email, status: user.status }
    });
    
    // Send OTP email asynchronously (don't wait)
    sendOTPEmail(email, name, otp).catch(emailError => {
      console.error('Failed to send OTP email:', emailError);
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/users/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and OTP are required' 
      });
    }
    
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid OTP or email' 
      });
    }
    
    // Update user status to active and clear OTP
    user.status = 1;
    user.otp = undefined;
    await user.save();
    
    res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully',
      data: { id: user._id, name: user.name, email: user.email, status: user.status }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate login data
    const validation = validateLogin({ email, password });
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: validation.error 
      });
    }
    
    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
    
    // Check if user is verified
    if (user.status !== 1) {
      return res.status(401).json({ 
        success: false, 
        error: 'Please verify your email first' 
      });
    }
    
    // Check password
    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }
    
    // Generate JWT token
    const token = generateToken(user._id);
    
    res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Forgot password
// @route   POST /api/users/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email is required' 
      });
    }
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found with this email' 
      });
    }
    
    // Generate reset token
    const resetToken = generateResetToken();
    
    // Set reset token and expiry (10 minutes)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();
    
    // Send response immediately
    res.status(200).json({ 
      success: true, 
      message: 'Password reset link sent to your email' 
    });
    
    // Send reset email asynchronously
    sendResetPasswordEmail(email, user.name, resetToken).catch(emailError => {
      console.error('Failed to send reset password email:', emailError);
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'Token and new password are required' 
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        error: 'Password must be at least 6 characters' 
      });
    }
    
    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid or expired reset token' 
      });
    }
    
    // Hash new password and update user
    user.password = hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    res.status(200).json({ 
      success: true, 
      message: 'Password reset successfully' 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
exports.logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: 'No token provided' 
      });
    }
    
    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid token' 
      });
    }
    
    // Find user and validate
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};