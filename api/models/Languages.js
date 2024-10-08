const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
  language_name: {
    type: String,
    required: true,
  },
  compiler_version: {
    type: String, // You may specify type for clarity
  },
});

module.exports = mongoose.model('Language', LanguageSchema);
