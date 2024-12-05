const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');

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

        teacher.password = await bcrypt.hash(password, 10);
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
