const User = require("../models/Users");
const express = require("express");
const userController = express.Router();

userController.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

userController.post("/addUser", async (req, res) => {
  const { username, email, password_hash } = req.body;

  if (!username) {
    return res.status(400).json({ msg: "Name is required" });
  }

  try {
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

userController.put("/updateUser/:id", async (req, res) => {
  const { username, email, password_hash } = req.body; // Updated to reflect the correct fields

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password_hash = password_hash || user.password_hash;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

userController.delete("/deleteUser/:id", async (req, res) => {
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


module.exports = userController;
