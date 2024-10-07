const mongoose = require('mongoose');

const McqQuestionSchema = new mongoose.Schema({
    test_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'McqTest',
      required: true,
    },
    question_text: String,
    option_a: String,
    option_b: String,
    option_c: String,
    option_d: String,
    correct_option: String,
  });
  
  module.exports = mongoose.model('McqQuestion', McqQuestionSchema);
  