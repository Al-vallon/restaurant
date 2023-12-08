const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

const verifyToken = (req,res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'No token provided'});
    }

    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            console.error('Failed to authenticate token:', err.message);
            return res.status(401).json({ message: 'Failed to authenticate token.' });
        }

        // req.userRole = decoded.isAdmin ? 'admin' : 'user';
        req.userRole = decoded.role_id;
        console.log("Decoded Token:", decoded);
        console.log("userRole pof", req.userRole);
        next();
    })
};


const isAdmin = (req, res, next) => {
    if (req.userRole === 1 ) {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. You are not authorized to access this page.' });
    }
};

module.exports = { verifyToken, isAdmin };