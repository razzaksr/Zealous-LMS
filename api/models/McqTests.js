const mongoose = require('mongoose');

const McqTestSchema = new mongoose.Schema({
    title: String,
    description: String,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('McqTest', McqTestSchema);
  