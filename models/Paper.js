
const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    paperName: String,
    marks: Number,
    submitted: Boolean,
    deadline: Date,
});

const Paper = mongoose.model('Paper', paperSchema);
module.exports = Paper
