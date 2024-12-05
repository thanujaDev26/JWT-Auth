const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    studentID: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    papers: [
        {
            paperName: String,
            marks: Number,
            deadline: Date,
            submitted: Boolean,
        },
    ],
});

module.exports = mongoose.model('Student', studentSchema);
