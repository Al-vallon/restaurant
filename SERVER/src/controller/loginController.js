/* import user from model  */
const { User } = require('../models/users/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

/* import color for log */
const { successColor, errorColor, resetColor, nodePort } = require('../asset/colorizedLog');


const logUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { name: req.body.name } });
        if (!user) {
            res.status(401).json({ message: 'Incorrect login or password' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {

            /* create token if password is good */
            const token = jwt.sign(
                { userId: user.isSoftDeleted },
                privateKey,
                { expiresIn:'24 H' }
            )
            console.log(successColor, 'Successful connection' ,resetColor);
            res.status(200).json({ message: 'Successful connection', token: token  });
        } else {
            console.log(errorColor, 'Incorrect login or passwordn' ,resetColor);
            res.status(401).json({ message: 'Incorrect login or password' });
        }
    } catch (error) {
        console.error(errorColor, 'Connection error', error, resetColor);
        res.status(500).json({ message: 'Connection error' });
    }
};

module.exports = {
    logUser
};