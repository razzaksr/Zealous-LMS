const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  input_format: {
    type: String,
    required: true,
  },
  output_format: {
    type: String,
    required: true,
  },
  sample_input: {
    type: String,
    required: true,
  },
  constraints: {
    type: String,
    required: true,
  },
  time_limit: {
    type: Number,
    required: true,
  },
  memory_limit: {
    type: Number,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',                       
    required: true,
  },
  testcase_id: {
      type: Array,
      required: true,
  }
}, { 
  timestamps: true,
});

module.exports = mongoose.model('Problem', ProblemSchema);
