const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, authMiddleware.checkAdmin, userController.getAllUsers);
router.put('/:id', authMiddleware.authenticate, userController.updateUserById);

module.exports = router;