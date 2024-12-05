const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
let refreshTokens=[];
require('dotenv').config();
let salt = process.env.SALT;


// Admin Signup
exports.adminSignup = async (req, res) => {
    try {
        const { name, NIC, email, password, phoneNumber } = req.body;
        let admin = await Admin.findOne({ NIC });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        admin = new Admin({
            name,
            NIC,
            email,
            password,
            phoneNumber
        });
        admin.password = await bcrypt.hash(password, salt);
        await admin.save();
        res.status(201).json({ message: 'Admin created successfully', data: admin });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Admin Login
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const NIC = admin.NIC;
        const adminName = admin.name;
        const accessToken = jwt.sign({ id: admin._id, role: 'admin' }, process.env.TOKEN_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: admin._id, role: 'admin' }, process.env.RE_TOKEN_KEY, { expiresIn: '24h' });

        refreshTokens.push(refreshToken);

        res.status(200).json({
            NIC,
            accessToken,
            refreshToken
        });
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

// exports.getAdminSignOut = async (req,res)=>{
//     const refreshToken = req.body.refreshToken;
//     refreshTokens = refreshTokens.filter(t=> t !== refreshToken);
//     res.sendStatus(204);
// }