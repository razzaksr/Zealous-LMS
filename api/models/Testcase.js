const mongoose = require('mongoose');

const TestcaseSchema = new mongoose.Schema(
    {
      problem_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true,
      },
      input: String,
      expected_output: String,
      is_public: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('Testcase', TestcaseSchema);
  