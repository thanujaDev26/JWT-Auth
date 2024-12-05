const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports  = Teacher