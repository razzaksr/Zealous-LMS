const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    permissions: {
      type: Object,
      required: true,
    },
  });
  
  module.exports = mongoose.model('Admin', AdminSchema);
  