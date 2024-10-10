const express = require('express');
const router = express.Router();
const McqQuestion = require('../models/McqQuestions');

// CREATE MCQ Question
router.post('/addMcqQuestion', async (req, res) => {
  try {
    const newMcqQuestion = new McqQuestion(req.body);
    const mcqQuestion = await newMcqQuestion.save();
    res.status(201).json(mcqQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ All MCQ Questions
router.get('/getAllMcqQuestions', async (req, res) => {
  try {
    const mcqQuestions = await McqQuestion.find();
    res.status(200).json(mcqQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ MCQ Question by ID
router.get('/getAllMcqQuestions/:id', async (req, res) => {
  try {
    const mcqQuestion = await McqQuestion.findById(req.params.id);
    if (!mcqQuestion) return res.status(404).json({ msg: 'MCQ Question not found' });
    res.status(200).json(mcqQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE MCQ Question
router.put('/updateMcqQuestion/:id', async (req, res) => {
  try {
    const mcqQuestion = await McqQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mcqQuestion) return res.status(404).json({ msg: 'MCQ Question not found' });
    res.status(200).json(mcqQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE MCQ Question
router.delete('/deleteMcqQuestion/:id', async (req, res) => {
  try {
    const mcqQuestion = await McqQuestion.findByIdAndDelete(req.params.id);
    if (!mcqQuestion) return res.status(404).json({ msg: 'MCQ Question not found' });
    res.status(200).json({ msg: 'MCQ Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;