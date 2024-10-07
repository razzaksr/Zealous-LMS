const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    language_name: {
      type: String,
      required: true,
    },
    compiler_version: String,
  });
  
  module.exports = mongoose.model('Language', LanguageSchema);
  