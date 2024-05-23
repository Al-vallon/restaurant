const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController'); 

router.get('/product/:id', ProductController.getProductByID);
// router.get('/users/:id', UserController.getUserById);
router.post('/register', ProductController.createProduct);
// router.put('/users/:id', UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);
// router.delete('/users', UserController.deleteAllUser);


module.exports = router;