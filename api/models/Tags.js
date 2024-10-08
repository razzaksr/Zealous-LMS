const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  tag_name: {
    type: String,
    required: true,
  },
}, { timestamps: true });  // Optional: Automatically add createdAt and updatedAt timestamps

module.exports = mongoose.model('Tag', TagSchema);
