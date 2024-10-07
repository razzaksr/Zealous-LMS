const express = require('express');
const router = express.Router();
const Tag = require('../models/Tags');

// CREATE Tag
// router.post('/addTags', async (req, res) => {
//   try {
//     const newTag = new Tag(req.body);
//     const tag = await newTag.save();
//     res.status(201).json(tag);a
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post('/addTags', async (req, res) => {
  const { tag_name } = req.body;

  // Validate input
  if (!tag_name) {
    return res.status(400).json({ error: 'Tag name is required' });
  }

  try {
    const newTag = new Tag(req.body);
    const tag = await newTag.save();
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// READ All Tags
router.get('/getAllTags', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ Tag by ID
router.get('/getTagsById/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ msg: 'Tag not found' });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Tag
router.put('/updateTags/:id', async (req, res) => {
  console.log(req.body); // Log the request body
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tag) return res.status(404).json({ msg: 'Tag not found' });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE Tag
router.delete('/deleteTags/:id', async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ msg: 'Tag not found' });
    res.status(200).json({ msg: 'Tag deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
