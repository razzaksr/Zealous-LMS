const mongoose = require('mongoose');

const UserTestResultSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    test_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CodingTest',
      required: true,
    },
    score: Number,
  }, { timestamps: true });
  
  module.exports = mongoose.model('UserTestResult', UserTestResultSchema);
  