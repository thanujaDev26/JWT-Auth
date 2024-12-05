const mongoose = require('mongoose');
const Paper = require('./Paper')

const StudentSchema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    // papers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paper' }],
    ALyear: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Student= mongoose.model('Student', StudentSchema);

module.exports = Student
