const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController'); 

router.use(express.json());

router.post('/login', loginController.logUser);

module.exports = router;