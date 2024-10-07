const mongoose = require('mongoose');

const McqQuestionSchema = new mongoose.Schema({
  question_id: {
    type: Number,      // Integer type for question_id
    unique: true,      // Ensure that question_id is unique
    required: true,    // Required field
  },
  test_id: {
    type: Number,      // Changed from ObjectId to Number to match SQL integer type
    required: true,
  },
  question_text: {
    type: String,      // Text type for question_text
    required: true,
  },
  option_a: {
    type: String,      // Text type for option_a
    required: true,
  },
  option_b: {
    type: String,      // Text type for option_b
    required: true,
  },
  option_c: {
    type: String,      // Text type for option_c
    required: true,
  },
  option_d: {
    type: String,      // Text type for option_d
    required: true,
  },
  correct_option: {
    type: String,      // Text type for correct_option
    required: true,
  },
});

module.exports = mongoose.model('McqQuestion', McqQuestionSchema);
