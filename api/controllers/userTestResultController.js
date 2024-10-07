const express = require("express");
const router = express.Router();
const UserTestResult = require("../models/UserTestResults");

// CREATE User Test Result
router.post("/addUserTestResults", async (req, res) => {
  try {
    const newUserTestResult = new UserTestResult(req.body);
    const userTestResult = await newUserTestResult.save();
    res.status(201).json(userTestResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ All User Test Results
router.get("/getAllUserTestResults", async (req, res) => {
  try {
    const userTestResults = await UserTestResult.find();
    res.status(200).json(userTestResults);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ User Test Result by ID
router.get("/getUserTestResultById/:id", async (req, res) => {
  try {
    const userTestResult = await UserTestResult.findById(req.params.id);
    if (!userTestResult)
      return res.status(404).json({ msg: "User Test Result not found" });
    res.status(200).json(userTestResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE User Test Result
router.put("/updateUserTestResult/:id", async (req, res) => {
  try {
    const userTestResult = await UserTestResult.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!userTestResult)
      return res.status(404).json({ msg: "User Test Result not found" });
    res.status(200).json(userTestResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE User Test Result
router.delete("/deleteUserTestResult/:id", async (req, res) => {
  try {
    const userTestResult = await UserTestResult.findByIdAndDelete(
      req.params.id
    );
    if (!userTestResult)
      return res.status(404).json({ msg: "User Test Result not found" });
    res.status(200).json({ msg: "User Test Result deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
