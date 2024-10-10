const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  leaderboard_id: {
    type: Number,   // Integer equivalent in Mongoose
    unique: true,   // Ensures this is unique
    required: true, // Required field
  },
  user_id: {
    type: Number,   // Changed from ObjectId to Number to match SQL integer type
    required: true,
  },
  total_problems_solved: {
    type: Number,   // Integer type for total_problems_solved
    default: 0,     // Set default value to 0
  },
  total_submissions: {
    type: Number,   // Integer type for total_submissions
    default: 0,     // Set default value to 0
  },
  rating: {
    type: Number,   // Integer type for rating
    default: 0,     // Set default value to 0
  },
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
