const User = require("../models/Users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Get all users
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Add a new user with hashed password
router.post("/addUser", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({ msg: "Name is required" });
  }

  if (!password) {
    return res.status(400).json({ msg: "Password is required" });
  }

  try {
    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password_hash,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Update user with hashed password if provided
router.put("/updateUser/:id", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update fields if provided
    user.username = username || user.username;
    user.email = email || user.email;

    // Hash the new password if it is provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password_hash = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Delete a user by ID
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
