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

router.get("/getUserById/:id", async (req, res) => {
  try{
    const users = await User.findById(req.params.id);
    if(!users) return res.status(404).json({ msg: 'User not found' });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/addUser", async (req, res) => {
  const { username, email, password, role, status, mcqTestsAssigned, codingTestsAssigned } = req.body;

  // Validate required fields
  if (!username) {
    return res.status(400).json({ msg: "Username is required" });
  }

  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ msg: "Password is required" });
  }

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ msg: "Username or email already exists" });
    }

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password_hash,
      role,
      status,
      mcqTestsAssigned,
      codingTestsAssigned
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Update user with hashed password if provided
router.put("/updateUser/:id", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

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
