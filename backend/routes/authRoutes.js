const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ✅ Use the functions directly — not with () and not undefined
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
