const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const User = require("../models/User");
const { sendResetEmail } = require("../utils/utils");

// Setup express-session
var app = express();

router.use(
  session({
    secret: "asdasldasjdl", // Change this to a more secure secret
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware login check
const isLoggedIn = (req, res, next) => {
  console.log(req.session);
  if (req.session.userToken) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if username exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, "secret-zwolfe-key", {
      expiresIn: "1h",
    });

    // Store the token in the session
    req.session.userToken = token;

    console.log(req.session);
    res.json({ token, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/check-login", isLoggedIn, (req, res) => {
  console.log(req.session.userToken);
  res.json({ user: req.session.userToken });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // Send reset email
  sendResetEmail(email, user._id);

  res.status(200).json({ message: "Reset email sent successfully." });
});

router.post("/reset-password", async (req, res) => {
  const { id, newPassword } = req.body;
  // console.log(resetToken);
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password in the database
  await User.updateOne({ id }, { password: hashedPassword });
  console.log("success");
  res.status(200).json({ message: "Password reset successfully." });
});

module.exports = router;
