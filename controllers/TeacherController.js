const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
let refreshTokens=[];


require('dotenv').config();
let salt = process.env.SALT;
// Teacher Signup
exports.teacherSignup = async (req, res) => {
    try {
        const { email, password, phoneNumber } = req.body;

        let teacher = await Teacher.findOne({ email });
        if (teacher) {
            return res.status(400).json({ message: 'Teacher already exists' });
        }

        teacher = new Teacher({
            email,
            password,
            phoneNumber
        });

        teacher.password = await bcrypt.hash(password, salt);
        await teacher.save();
        res.status(201).json({ message: 'Teacher created successfully', data: teacher });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Teacher Login
exports.teacherLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ id: teacher._id, role: 'teacher' }, process.env.TOKEN_KEY, { expiresIn: '1h' });

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

