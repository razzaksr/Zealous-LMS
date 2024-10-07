const mongoose = require('mongoose');

const CodingTestSchema = new mongoose.Schema({
    test_id: {
        type: Number, // Corresponding to 'test_id' integer in the table
        required: true,
        unique: true // Assuming test_id is unique
    },
    admin_id: {
        type: Number, // Corresponding to 'admin_id' integer in the table
        required: true,
    },
    coding_title: {
        type: String, // Corresponding to 'coding_title' varchar in the table
        required: true,
    },
    description: {
        type: String, // Corresponding to 'description' text in the table
        required: true,
    },
    testcase_id: {
        type: Number, // Corresponding to 'testcase_id' integer in the table
    }
}, { 
    timestamps: true // This will automatically create 'created_at' and 'updated_at' fields
});

// Export the model
module.exports = mongoose.model('CodingTest', CodingTestSchema);
