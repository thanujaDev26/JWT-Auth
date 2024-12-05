const jwt = require('jsonwebtoken');

exports.refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token required' });
        }

        jwt.verify(refreshToken, process.env.RE_TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired refresh token' });
            }
            
            const newAccessToken = jwt.sign(
                { id: decoded.id, role: decoded.role },
                process.env.TOKEN_KEY,
                { expiresIn: '1h' }
            );

            const newRefreshToken = jwt.sign(
                { id: decoded.id, role: decoded.role },
                process.env.RE_TOKEN_KEY,
                { expiresIn: '7d' }
            );

            res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
