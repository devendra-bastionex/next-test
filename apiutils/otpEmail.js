const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendOTPEmail = async (email, name, otp) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Email Verification - OTP',
    html: `
      <h1>Welcome ${name}!</h1>
      <p>Thank you for registering with us.</p>
      <p>Your verification OTP is: <strong>${otp}</strong></p>
      <p>Please use this OTP to verify your email address.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error('OTP email sending failed:', error);
    throw error;
  }
};

module.exports = { sendOTPEmail };