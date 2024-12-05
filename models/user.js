const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: function () { return this.role === 'admin'; },
        unique: this.role === 'admin',
        lowercase: true,
        default : null
    },
    studentID: {
        type: String,
        required: function () { return this.role === 'student'; },
        unique: true,
    },
    password: {
        type: String,
        required: function () { return this.role === 'admin'; },
    },
    address: {
        type: String,
        required: function () { return this.role === 'student'; },
    },
    district: {
        type: String,
        required: function () { return this.role === 'student'; },
    },
    ALyear: {
        type: String,
        required: function () { return this.role === 'student'; },
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        required: true,
        default: 'student',
    },
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    if (this.role === 'admin' && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async function (password) {
    if (this.role === 'admin') {
        return bcrypt.compare(password, this.password);
    }
    return false;
};

module.exports = mongoose.model('User', userSchema);
