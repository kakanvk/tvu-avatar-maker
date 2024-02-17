const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware.authenticate, authController.getCurrentUser);
router.post('/login', authController.login);
router.post('/register', authMiddleware.authenticate, userController.createUser);
router.get('/logout', authController.logout);

module.exports = router;