const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
let refreshTokens=[];


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

        admin.password = await bcrypt.hash(password, 10);
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

        const accessToken = jwt.sign({ id: admin._id, role: 'admin' }, process.env.TOKEN_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: admin._id, role: 'admin' }, process.env.RE_TOKEN_KEY, { expiresIn: '24h' });
        res.status(200).json({
            email,
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getToken = async (req,res)=>{

    const refreshToken = req.body.refreshToken;
    if(refreshToken == null) {
        res.sendStatus(401);
    }
    if(!refreshTokens.includes(refreshToken)) {
        res.sendStatus(403);
    }

    jwt.verify(refreshToken,process.env.RE_TOKEN_KEY,(err,user)=>{
        if(err) res.sendStatus(403);
        const accessToken=jwt.sign({name:user.name},process.env.TOKEN_KEY,{expiresIn: '1h'});
        res.send({accessToken});
    });
}

exports.getAdminSignOut = async (req,res)=>{
    const refreshToken = req.body.refreshToken;
    refreshTokens = refreshTokens.filter(t=> t !== refreshToken);
    res.sendStatus(204);
}