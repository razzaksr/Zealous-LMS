const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema(
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      problem_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true,
      },
      code: String,
      language_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        required: true,
      },
      submission_date: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ['Accepted', 'Rejected', 'Pending'],
      },
      execution_time: Number,
      memory_usage: Number,
      testcases_passed: Number,
      total_testcases: Number,
    }
  );
  
  module.exports = mongoose.model('Submission', SubmissionSchema);
  