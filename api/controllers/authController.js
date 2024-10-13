// controllers/authController.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const authMiddleware = require('../middleware/authMiddleware'); // Import your User model

const router = express.Router();

// Login User and generate JWT token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Compare the entered password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // If the password matches, create a JWT token
    const token = jwt.sign(
      {
        userId: user._id,  // Include the user ID or any data you want to encode
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET, // Use the secret key from the .env file
      { expiresIn: '1h' }  // Token expiration time (1 hour in this case)
    );

    // Return the JWT token and user information
    res.status(200).json({
      msg: 'Login successful',
      token,  // The JWT token
      user: { username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile', authMiddleware, (req, res) => {
  // You can now access `req.user`, which contains the decoded token data
  res.json({ msg: 'Profile data', user: req.user });
});

module.exports = router;
