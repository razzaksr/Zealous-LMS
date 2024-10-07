const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
  language_id: {
    type: Number,  // Integer type for language_id
    unique: true,  // Ensure that language_id is unique
    required: true, // Required field
  },
  language_name: {
    type: String,
    required: true,
  },
  compiler_version: String,
});

module.exports = mongoose.model('Language', LanguageSchema);
