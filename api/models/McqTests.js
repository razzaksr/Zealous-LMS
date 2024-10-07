const mongoose = require('mongoose');

const McqTestSchema = new mongoose.Schema({
  test_id: {
    type: Number,       // Integer type for test_id
    unique: true,       // Ensure test_id is unique
    required: true,     // Required field
  },
  title: {
    type: String,       // String type for title
    required: true,     // Required field
  },
  description: {
    type: String,       // String type for description
    required: true,     // Required field
  },
  created_by: {
    type: Number,       // Changed from ObjectId to Number to match SQL integer type
    required: true,     // Required field
  }
}, { 
  timestamps: true     // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('McqTest', McqTestSchema);
