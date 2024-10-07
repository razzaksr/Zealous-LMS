const mongoose = require('mongoose');

const CodingTestSchema = new mongoose.Schema({
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    coding_title: String,
    description: String,
    testcase_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Testcase',
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('CodingTest', CodingTestSchema);
  