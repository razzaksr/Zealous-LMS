const express = require('express');
const router = express.Router();
const Submission = require('../models/Submissions');

// CREATE Submission
router.post('/addSubmission', async (req, res) => {
  try {
    const newSubmission = new Submission(req.body);
    const submission = await newSubmission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ All Submissions
router.get('/getAllSubmission', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ Submission by ID
router.get('/getSubmissionById/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ msg: 'Submission not found' });
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Submission
router.put('/updateSubmission/:id', async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!submission) return res.status(404).json({ msg: 'Submission not found' });
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Submission
router.delete('/deleteSubmission/:id', async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) return res.status(404).json({ msg: 'Submission not found' });
    res.status(200).json({ msg: 'Submission deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
