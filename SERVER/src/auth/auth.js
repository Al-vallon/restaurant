const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

/* import color for log */
const { successColor, errorColor, resetColor, nodePort } = require('../asset/colorizedLog');

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    console.log('token', authorizationHeader);

    if (!authorizationHeader) {
        console.error(errorColor, 'The token is missing, add it to the header', resetColor);
        return res.status(401).json({ message: 'The token is missing, add it to the header' });
    }

    const token = authorizationHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, privateKey);
        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            console.error(errorColor, 'The user ID is invalid', resetColor);
            return res.status(401).json({ message: 'The user ID is invalid' });
        }
        next();
    } catch (err) {
        console.error(errorColor, 'User cannot access without a valid token', resetColor);
        res.status(401).json({ message: 'User cannot access without a valid token' });
    }
};