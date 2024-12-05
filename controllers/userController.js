const jwt = require("jsonwebtoken");
const User = require('../models/user');
let refreshTokens = [];

// User login (for both students and admin)
exports.getUserLogin = async (req, res) => {
    try {
        const { studentID, email, password } = req.body;
        let user;


        // Check if it's a student or admin login
        if (studentID) {
            // Student login
            user = await User.findOne({ studentID });
            if (!user) {
                return res.status(404).json({ message: 'Student not found' });
            }
        } else if (email) {
            // Admin (Teacher) login
            user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            // Check if it's the teacher and validate password
            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            return res.status(400).json({ message: 'Either studentID or email must be provided' });
        }

        // Generate JWT tokens for login
        const accessToken = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.TOKEN_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.RE_TOKEN_KEY, { expiresIn: '24h' });

        refreshTokens.push(refreshToken);

        res.status(200).json({
            status: 'success',
            data: { user, accessToken, refreshToken }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Token refresh
exports.getToken = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(refreshToken, process.env.RE_TOKEN_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid refresh token' });
        const accessToken = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.TOKEN_KEY, { expiresIn: '1h' });
        res.status(200).json({ accessToken });
    });
};

// User signup (Student/Teacher)
exports.getUserSignup = async (req, res) => {
    try {
        const { name, studentID, email, password, address, district, ALyear, mobileNumber,role } = req.body;

        if (!mobileNumber) {
            return res.status(400).json({
                message: 'Mobile number is required'
            });
        }
        // Ensure role is either 'student' or 'admin'
        if (!role || (role !== 'student' && role !== 'admin')) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        let user;
        if (role === 'student') {
            // Student registration: email and password are not required for students
            user = await User.create({ name, studentID, address, district, ALyear,mobileNumber, role });
        } else {
            // Admin registration: email and password are required for admins
            user = await User.create({ name, email, password, mobileNumber,role });
        }

        res.status(201).json({ status: "success", data: { user } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
