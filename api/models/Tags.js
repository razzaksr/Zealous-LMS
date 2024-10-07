const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  tag_id: {
    type: Number,       // Integer type for tag_id
    required: true,
    unique: true,       // Ensure tag_id is unique
  },
  tag_name: {
    type: String,
    required: true,
  },
}, { timestamps: true });  // Optional: Automatically add createdAt and updatedAt timestamps

module.exports = mongoose.model('Tag', TagSchema);
