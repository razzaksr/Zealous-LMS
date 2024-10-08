const mongoose = require('mongoose');

const McqTestSchema = new mongoose.Schema({
  title: {
    type: String,       // String type for title
    required: true,     // Required field
  },
  description: {
    type: String,       // String type for description
    required: true,     // Required field
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId, // Change created_by to ObjectId
    required: true,     // Required field
    ref: 'User'         // Reference to the User model (assuming it exists)
  }
}, { 
  timestamps: true     // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('McqTest', McqTestSchema);
