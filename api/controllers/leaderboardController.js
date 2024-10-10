const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboards');

// CREATE Leaderboard entry
router.post('/addLeaderBoard', async (req, res) => {
  try {
    const newLeaderboardEntry = new Leaderboard(req.body);
    const leaderboardEntry = await newLeaderboardEntry.save();
    res.status(201).json(leaderboardEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ All Leaderboard entries
router.get('/getAllLeaderboards', async (req, res) => {
  try {
    const leaderboardEntries = await Leaderboard.find();
    res.status(200).json(leaderboardEntries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ Leaderboard entry by ID
router.get('/getAllLeaderboards/:id', async (req, res) => {
  try {
    const leaderboardEntry = await Leaderboard.findById(req.params.id);
    if (!leaderboardEntry) return res.status(404).json({ msg: 'Leaderboard entry not found' });
    res.status(200).json(leaderboardEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Leaderboard entry
router.put('/updateLeaderboard/:id', async (req, res) => {
  try {
    const leaderboardEntry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!leaderboardEntry) return res.status(404).json({ msg: 'Leaderboard entry not found' });
    res.status(200).json(leaderboardEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Leaderboard entry
router.delete('/deleteLeaderboard/:id', async (req, res) => {
  try {
    const leaderboardEntry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!leaderboardEntry) return res.status(404).json({ msg: 'Leaderboard entry not found' });
    res.status(200).json({ msg: 'Leaderboard entry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
