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

const sendResetPasswordEmail = async (email, name, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h1>Hello ${name}!</h1>
      <p>You have requested to reset your password.</p>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reset password email sent to ${email}`);
  } catch (error) {
    console.error('Reset password email sending failed:', error);
    throw error;
  }
};

module.exports = { sendResetPasswordEmail };