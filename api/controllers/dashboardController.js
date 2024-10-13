// controllers/dashboardController.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Middleware to authenticate using email and password from request body
async function authMiddleware(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // User is authenticated, move to next middleware
    req.user = user; // Attach user object to the request
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Dashboard Route (Protected)
router.get('/dashboard', authMiddleware, (req, res) => {
  const { username, mobile } = req.user;
  res.status(200).json({
    msg: `Welcome to the dashboard, ${username}`,
    mobile: `Your registered mobile number is ${mobile}`,
  });
});

module.exports = router;
