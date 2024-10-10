const mongoose = require('mongoose');

const McqQuestionSchema = new mongoose.Schema({
  test_id: {
    type: mongoose.Schema.Types.ObjectId, // Change test_id to ObjectId
    required: true,
    ref: 'McqTest' // Reference to the McqTest model (assuming it exists)
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
