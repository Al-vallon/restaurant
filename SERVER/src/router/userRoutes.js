const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController'); 

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/register', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.delete('/users', UserController.deleteAllUser);


module.exports = router;