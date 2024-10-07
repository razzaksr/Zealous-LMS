const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    total_problems_solved: Number,
    total_submissions: Number,
    rating: Number,
  });
  
  module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
  