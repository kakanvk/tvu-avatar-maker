const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware.authenticate, authController.getCurrentUser);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;