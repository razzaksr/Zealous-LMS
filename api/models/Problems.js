const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  problem_id: {
    type: Number,              // Integer type for problem_id
    required: true,
    unique: true,              // Ensure problem_id is unique
  },
  title: {
    type: String,              // String type for title
    required: true,
  },
  description: {
    type: String,              // String type for description
    required: true,
  },
  difficulty: {
    type: String,              // String type for difficulty
    enum: ['easy', 'medium', 'hard'], // Enum for difficulty levels
    required: true,
  },
  input_format: {
    type: String,              // String type for input_format
    required: true,
  },
  output_format: {
    type: String,              // String type for output_format
    required: true,
  },
  sample_input: {
    type: String,              // String type for sample_input
    required: true,
  },
  constraints: {
    type: String,              // String type for constraints
    required: true,
  },
  time_limit: {
    type: Number,              // Integer type for time_limit
    required: true,
  },
  memory_limit: {
    type: Number,              // Integer type for memory_limit
    required: true,
  },
  created_by: {
    type: Number,              // Integer type for created_by
    required: true,
  }
}, { 
  timestamps: true,           // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Problem', ProblemSchema);
