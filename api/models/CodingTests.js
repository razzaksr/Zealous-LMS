const mongoose = require('mongoose');

// Define the schema for coding tests
const CodingTestSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Change admin_id to ObjectId
        required: true,
        ref: 'Admin' // Reference to an Admin model (assuming it exists)
    },
    coding_title: {
        type: String, // Corresponding to 'coding_title' varchar in the table
        required: true,
    },
    description: {
        type: String, // Corresponding to 'description' text in the table
        required: true,
    },
    problem_id: {
        type: Array,
        required: true,
    }
}, { 
    timestamps: true // This will automatically create 'created_at' and 'updated_at' fields
});

// Export the model
module.exports = mongoose.model('CodingTest', CodingTestSchema);
