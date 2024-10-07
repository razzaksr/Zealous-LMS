const mongoose = require('mongoose');

const ProblemTagSchema = new mongoose.Schema({
    problem_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
      required: true,
    },
    tag_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: true,
    },
  });
  
  module.exports = mongoose.model('ProblemTag', ProblemTagSchema);
  