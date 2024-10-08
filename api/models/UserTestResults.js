const mongoose = require('mongoose');

const UserTestResultSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User
      ref: 'User',
      required: true,
    },
    test_id: {
      type: mongoose.Schema.Types.ObjectId, // Reference to CodingTest
      ref: 'CodingTest',
      required: true,
    },
    score: {
      type: Number,               // Use Number for float type score
      required: true,             // Mark as required
    },
  }, 
  { 
    timestamps: {                // Automatically add created_at and updated_at
      createdAt: 'created_at',    // Rename createdAt to created_at
      updatedAt: 'updated_at'      // Rename updatedAt to updated_at
    } 
  }
);

module.exports = mongoose.model('UserTestResult', UserTestResultSchema);
