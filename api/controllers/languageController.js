const express = require('express');
const router = express.Router();
const Language = require('../models/Languages');

// CREATE Language
router.post('/addLanguage', async (req, res) => {
  try {
    const newLanguage = new Language(req.body);
    const language = await newLanguage.save();
    res.status(201).json(language);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ All Languages
router.get('/getAllLanguage', async (req, res) => {
  try {
    const languages = await Language.find();
    res.status(200).json(languages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ Language by ID
router.get('/getAllLanguage/:id', async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language) return res.status(404).json({ msg: 'Language not found' });
    res.status(200).json(language);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Language
router.put('/updateLanguage/:id', async (req, res) => {
  try {
    const language = await Language.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!language) return res.status(404).json({ msg: 'Language not found' });
    res.status(200).json(language);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Language
router.delete('/deleteLanguage/:id', async (req, res) => {
  try {
    const language = await Language.findByIdAndDelete(req.params.id);
    if (!language) return res.status(404).json({ msg: 'Language not found' });
    res.status(200).json({ msg: 'Language deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
