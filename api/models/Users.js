const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    mcqTestsAssigned: {
      type: Array,
      required: false,
    },
    codingTestsAssigned: {
      type: Array,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
