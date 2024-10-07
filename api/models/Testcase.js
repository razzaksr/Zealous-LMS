const mongoose = require('mongoose');

const TestcaseSchema = new mongoose.Schema(
    {
      testcase_id: {
        type: Number,              // Integer type for testcase_id
        required: true,
        unique: true,              // Ensure testcase_id is unique
      },
      problem_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Problem
        ref: 'Problem',
        required: true,
      },
      input: {
        type: String,              // Use String for input
        required: true,            // Mark as required if necessary
      },
      expected_output: {
        type: String,              // Use String for expected_output
        required: true,            // Mark as required if necessary
      },
      is_public: {
        type: Boolean,
        default: false,
      },
    },
    { 
      timestamps: {               // This will create 'createdAt' and 'updatedAt' fields
        createdAt: 'created_at',  // Rename 'createdAt' to 'created_at'
        updatedAt: 'updated_at'    // Rename 'updatedAt' to 'updated_at'
      } 
    }
);

module.exports = mongoose.model('Testcase', TestcaseSchema);
