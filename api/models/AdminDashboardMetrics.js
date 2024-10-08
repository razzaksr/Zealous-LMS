const mongoose = require("mongoose");

const AdminDashboardMetricsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // Reference to the Admin model
      required: true,
    },
    total_users: {
      type: Number,
      default: 0,
    },
    total_mcq_tests: {
      type: Number,
      default: 0,
    },
    total_coding_tests: {
      type: Number,
      default: 0,
    },
    average_score_mcq: {
      type: Number,
      default: 0,
    },
    average_score_coding: {
      type: Number,
      default: 0,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create the model
module.exports = mongoose.model("AdminDashboardMetrics", AdminDashboardMetricsSchema);
