// Example: utils/index.js

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const generateResetToken = () => crypto.randomUUID().toString("hex");

const validateResetToken = async (token) => {
  const user = await User.findOne({ resetToken: token });

  if (!user || user.resetTokenExpires < Date.now()) {
    return false; // Token not found or expired
  }

  return true;
};

const sendResetEmail = (email, id) => {
  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mzhyusein@gmail.com",
      pass: "kqyf zxng dwtu ljcr",
    },
  });

  // Email content
  const mailOptions = {
    from: "mzhyusein@gmail.com",
    to: email,
    subject: "FitWell - Password Reset",
    text: `Click the following link to reset your password: http://localhost:3000/reset-password?id=${id}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending reset email:", error);
    } else {
      console.log("Reset email sent:", info.response);
    }
  });
};

module.exports = {
  generateResetToken,
  validateResetToken,
  sendResetEmail,
};
