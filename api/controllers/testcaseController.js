const express = require('express');
const router = express.Router();
const Testcase = require('../models/Testcase');

// CREATE Testcase
router.post('/addTestcase', async (req, res) => {
  try {
    const newTestcase = new Testcase(req.body);
    const testcase = await newTestcase.save();
    res.status(201).json(testcase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ All Testcases
router.get('/getAllTestcases', async (req, res) => {
  try {
    const testcases = await Testcase.find();
    res.status(200).json(testcases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ Testcase by ID
router.get('/getTestcaseByID/:id', async (req, res) => {
  try {
    const testcase = await Testcase.findById(req.params.id);
    if (!testcase) return res.status(404).json({ msg: 'Testcase not found' });
    res.status(200).json(testcase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Testcase
router.put('/updateTestcase/:id', async (req, res) => {
  try {
    const testcase = await Testcase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testcase) return res.status(404).json({ msg: 'Testcase not found' });
    res.status(200).json(testcase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Testcase
router.delete('/deleteTestcase/:id', async (req, res) => {
  try {
    const testcase = await Testcase.findByIdAndDelete(req.params.id);
    if (!testcase) return res.status(404).json({ msg: 'Testcase not found' });
    res.status(200).json({ msg: 'Testcase deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
