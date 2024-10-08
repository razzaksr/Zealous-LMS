const mongoose = require('mongoose');

const ProblemTagSchema = new mongoose.Schema({
  problem_tag_id: {
    type: Number,                // Integer type for problem_tag_id
    required: true,
    unique: true,                // Ensure problem_tag_id is unique
  },
  problem_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Problem
    ref: 'Problem',
  },
  tag_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Tag
    ref: 'Tag',
  },
});

module.exports = mongoose.model('ProblemTag', ProblemTagSchema);
