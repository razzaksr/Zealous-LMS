const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    tag_name: {
      type: String,
      required: true,
    },
  });
  
  module.exports = mongoose.model('Tag', TagSchema);
  