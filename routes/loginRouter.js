const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/login', loginController.showLogin);
router.post('/login', loginController.login);
router.get('/logout', loginController.logout);
router.get('/registrar', loginController.formRegister);
router.post('/registrar', loginController.register);

module.exports = router;