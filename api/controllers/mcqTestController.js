const express = require('express');
const router = express.Router();
const McqTest = require('../models/McqTests');

// CREATE MCQ Test
router.post('/addMcqTest', async (req, res) => {
  try {
    const newMcqTest = new McqTest(req.body);
    const mcqTest = await newMcqTest.save();
    res.status(201).json(mcqTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ All MCQ Tests
router.get('/getAllMcqTests', async (req, res) => {
  try {
    const mcqTests = await McqTest.find();
    res.status(200).json(mcqTests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ MCQ Test by ID
router.get('/getMcqTestById/:id', async (req, res) => {
  try {
    const mcqTest = await McqTest.findById(req.params.id);
    if (!mcqTest) return res.status(404).json({ msg: 'MCQ Test not found' });
    res.status(200).json(mcqTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE MCQ Test
router.put('/updateMcqTest/:id', async (req, res) => {
  try {
    const mcqTest = await McqTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mcqTest) return res.status(404).json({ msg: 'MCQ Test not found' });
    res.status(200).json(mcqTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE MCQ Test
router.delete('/deleteMcqTest/:id', async (req, res) => {
  try {
    const mcqTest = await McqTest.findByIdAndDelete(req.params.id);
    if (!mcqTest) return res.status(404).json({ msg: 'MCQ Test not found' });
    res.status(200).json({ msg: 'MCQ Test deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
