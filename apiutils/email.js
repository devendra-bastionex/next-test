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

const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Welcome to Snitch!',
    html: `
      <h1>Welcome ${name}!</h1>
      <p>Thank you for registering with us.</p>
      <p>Your account has been successfully created.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

module.exports = { sendWelcomeEmail };