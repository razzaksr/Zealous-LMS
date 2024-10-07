const express = require('express');
const router = express.Router();
const CodingTest = require('../models/CodingTests');

// CREATE Coding Test
router.post('/addCodingTest', async (req, res) => {
  try {
    const newCodingTest = new CodingTest(req.body);
    const codingTest = await newCodingTest.save();
    res.status(201).json(codingTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ All Coding Tests
router.get('/getAllCodingTests', async (req, res) => {
  try {
    const codingTests = await CodingTest.find();
    res.status(200).json(codingTests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ Coding Test by ID
router.get('/getCodingTestById/:id', async (req, res) => {
  try {
    const codingTest = await CodingTest.findById(req.params.id);
    if (!codingTest) return res.status(404).json({ msg: 'Coding Test not found' });
    res.status(200).json(codingTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Coding Test
router.put('/updateCodingTest/:id', async (req, res) => {
  try {
    const codingTest = await CodingTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!codingTest) return res.status(404).json({ msg: 'Coding Test not found' });
    res.status(200).json(codingTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Coding Test
router.delete('/deleteCodingTest/:id', async (req, res) => {
  try {
    const codingTest = await CodingTest.findByIdAndDelete(req.params.id);
    if (!codingTest) return res.status(404).json({ msg: 'Coding Test not found' });
    res.status(200).json({ msg: 'Coding Test deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
