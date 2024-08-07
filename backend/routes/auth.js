const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify/:token', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:resetToken', authController.resetPassword);

module.exports = router;