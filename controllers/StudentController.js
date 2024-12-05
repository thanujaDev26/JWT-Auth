const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
// const Paper  = require('../models/Paper');
let refreshTokens=[];

exports.studentSignup = async (req, res) => {
    try {
        const { studentID, name, ALyear, mobileNumber, email, address, district } = req.body;

        let student = await Student.findOne({ studentID })
        if (student) {
            return res.status(400).json({ message: 'Student already exists' });
        }

        student = new Student({
            studentID,
            name,
            ALyear,
            mobileNumber,
            email,
            address,
            district
        });

        await student.save();
        res.status(201).json({ message: 'Student created successfully', data: student });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Student Login
exports.studentLogin = async (req, res) => {
    try {
        const { studentID } = req.body;

        const student = await Student.findOne({ studentID });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const accessToken = jwt.sign({ id: student._id, role: 'student' }, process.env.TOKEN_KEY, { expiresIn: '1h' });

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getDashboard = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Dashboard successful',
        })
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


exports.getToken = async (req,res)=>{
    const { refreshToken } = req.body;
    if(refreshToken == null) {
        return res.status(401).json({
            message: 'Refresh token required'
        });
    }
    if(!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({
            message: 'Invalid refresh token'
        });
    }

    jwt.verify(refreshToken,process.env.RE_TOKEN_KEY,(err,user)=>{
        if(err) {
            res.sendStatus(403);
        }
        const accessToken=jwt.sign({name:user.name},process.env.TOKEN_KEY,{expiresIn: '1h'});
        res.json({
            accessToken: accessToken
        });
    });
}
