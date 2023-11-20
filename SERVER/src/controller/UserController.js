/* import user from model  */
const { User, Role } = require('../models/users/users'); 
const bcrypt = require('bcrypt'); /* call bcrypt library */

/* import color for log */
const { successColor, errorColor, resetColor, nodePort } = require('../asset/colorizedLog');


/* get all users */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        const message = 'List of users:';
        console.log(successColor, 'List of users:', users, resetColor);
        res.json({ message, data: users });
    } catch (error) {
        console.error(errorColor, 'Error getting users:', error, resetColor);
        res.status(500).json({ message: 'Error getting users' });
    }
};

/* get user by ID */
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id', id);
        const selectedUser = await User.findByPk(id);

        if (!selectedUser) {
            const message = 'No user found';
            console.log(errorColor, 'No user found', resetColor);
            return res.status(404).json({ message });
        }

        const message = 'A user has been found.';
        res.status(200).json({ message, data: selectedUser });
    } catch (error) {
        console.error(errorColor, error.message, resetColor);
        res.status(500).json({ message: "Error to get users" });
    }
};

/* Create new user */
const createUser = async (req, res) => {
    try {
        const { name, password, password2, mail } = req.body;

        if (!name || !password || !password2 || !mail) {
            return res.status(400).json({ message: "All properties must be provided" });
        };

        const validMail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!validMail.test(mail)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }

        const existingName = await User.findOne({ where: { name } });
        if (existingName) {
            return res.status(400).json({ message: "Username is already in use" });
        };

        const existingUser = await User.findOne({ where: { mail } });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        };

        if (password !== password2) {
            console.log(errorColor, 'Passwords must be the same', resetColor);
            return res.status(400).json({ message: "Passwords must be the same" });
        };

        bcrypt.genSalt(10, async function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    return res.status(500).json({ message: "Error hashing the password" })
                }
                try {
                    const newUser =  User.create({ name, password:hash, password2:hash, mail });
                    console.log(successColor, "User created successfully", resetColor);
                    res.status(200).json({ message: "User created successfully", data: newUser });
                } catch (error) {
                    console.error(error.message);
                    res.status(500).json({ message: "Error adding a user"});
                }
            });
        });
    } catch (error) {
        /* email is already use  */
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({ message: "Email is already in use" });
        } else {
            console.error(error.message);
        res.status(500).json({ message: "Error adding a user" });
        }
    }
};

/* Change info for user */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password, password2, mail } = req.body;

        /* Check if user exists */
        const existingUser = await User.findByPk(id);
        if (!existingUser) {
            console.log(errorColor, "User not found", resetColor);
            return res.status(404).json({ message: "User not found" });
        }

        /* Update params of user */
        existingUser.name = name || existingUser.name;
        existingUser.password = password || existingUser.password;
        existingUser.password2 = password2 || existingUser.password2;
        existingUser.mail = mail || existingUser.mail;

        /* Save data in DB */
        await existingUser.save();

        console.log(successColor, "User updated successfully", resetColor);
        res.status(200).json({ message: "User updated successfully", data: existingUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error with add new data in user" });
    }
};

/* Delete selected user */
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        /* Delete user by ID */ 
        const deleteCount = await User.destroy({
            where: {
                id: userId
            }
        });

        if (deleteCount > 0) {
            console.log(successColor, `User with ID ${userId} is deleted`, resetColor);
            res.status(200).json({ message: `User with ID ${userId} is deleted` });
        } else {
            console.log(errorColor, `User with ID ${userId} not found`, resetColor);
            res.status(404).json({ message: `User with ID ${userId} not found` });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error deleting user" });
    }
};

/* Delete all user */
const deleteAllUser = async(req,res)=> { 
    try {
        const deleteUsers = await User.destroy({
            where:{
                id:{
                    [Sequelize.Op.not]: 1 // Exclude user with ID 1
                }
            }
        }) /* delete all users exept id 1 =  Admin */
        console.log(successColor, "All Users are deleted", resetColor);
        res.status(200).json({ message: "All Users are deleted", deleteUsers})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message:"Error deleting users"});
    }
};



module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteAllUser,
    deleteUser
};
